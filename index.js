const { App } = require("@slack/bolt");
const fetch = require("node-fetch");
require("dotenv").config();

// Secrets
const MENDABLE_KEY = process.env["MENDABLE_API_KEY"];
const SLACK_BOT_TOKEN = process.env["SLACK_BOT_TOKEN"];
const SLACK_SIGNING_SECRET = process.env["SLACK_SIGNING_SECRET"];
const SLACK_APP_TOKEN = process.env["SLACK_APP_TOKEN"];

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  appToken: SLACK_APP_TOKEN,
  socketMode: true,
});

const historyMap = new Map();
const threadToChannelMap = new Map();

async function createConversation() {
  const url = "https://api.mendable.ai/v0/newConversation";

  const data = {
    api_key: `${MENDABLE_KEY}`,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseJSON = await response.json();

  return responseJSON["conversation_id"];
}

async function getAnswerAndSources(question, history = []) {
  const url = "https://api.mendable.ai/v0/mendableChat";
  let conversation_id = null;
  if (history.length === 0) {
    conversation_id = await createConversation();
  } else {
    // Get the conversation ID from the history
    conversation_id = history[history.length - 1].conversation_id;
  }

  const data = {
    anon_key: `${MENDABLE_KEY}`,
    question: `${question}`,
    history: history,
    shouldStream: false,
    conversation_id: conversation_id,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return { response, conversation_id };
}
app.message(async ({ message, say }) => {
  try {
    const messageContent = message.text;

    if (!messageContent.startsWith(`<@${context.botUserId}>`)) {
      return;
    }

    let formattedMessage = messageContent;
    formattedMessage = formattedMessage.split(`<@${context.botUserId}>`)[1];

    if (!formattedMessage) return;

    let threadId = message.ts;
    let channelId = message.channel;

    let history = historyMap.get(threadId) || [];

    const { response, conversation_id } = await getAnswerAndSources(
      formattedMessage.trim(),
      history
    );

    const responseJSON = await response.json();
    const answer = responseJSON["answer"]["text"];
    const sources = responseJSON["sources"]
      .map((source) => source["link"])
      .join("\n");

    history.push({
      prompt: formattedMessage.trim(),
      response: answer,
      conversation_id: conversation_id,
    });

    historyMap.set(threadId, history);

    await say({
      thread_ts: message.ts,
      text: `Answer: ${answer}\nSources:\n${sources}`,
    });
  } catch (error) {
    console.log(error);
    console.log("Something went wrong!");
  }
});

// create an edpoint for challenge

app.event("app_mention", async ({ event, context, client, say }) => {
  try {
    let messageContent = event.text;
    let formattedMessage = messageContent.split(`<@${context.botUserId}>`)[1];

    if (!formattedMessage) return;

    let threadId = event.thread_ts || event.ts;
    let channelId = event.channel;

    let history = historyMap.get(threadId) || [];

    const { response, conversation_id } = await getAnswerAndSources(
      formattedMessage.trim(),
      history
    );

    const responseJSON = await response.json();
    const answer = responseJSON["answer"]["text"];
    const sources = responseJSON["sources"]
      .map((source) => source["link"])
      .join("\n");

    history.push({
      prompt: formattedMessage.trim(),
      response: answer,
      conversation_id: conversation_id,
    });

    historyMap.set(threadId, history);

    await say({
      channel: channelId,
      thread_ts: threadId,
      // tag the user who asked the question
      text: `
      <@${event.user}>\n\n${answer}\n\n\n- Verified Sources:\n${sources}`,
      unfurl_links: false,
    });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3003);

  console.log("⚡️ Slack bot is running!");
})();

# Mendable AI Slack Bot

The Mendable AI Slack Bot is a conversational bot that uses the Mendable AI API to answer questions asked by users in a Slack workspace. The bot maintains a history of conversations and provides sources for its answers.

## Prerequisites

- Node.js
- A Slack workspace
- Mendable AI API key

## Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install all the necessary dependencies.
3. Create a `.env` file in the root directory of the project and add the following environment variables:

```
MENDABLE_API_KEY=<Your Mendable API Key>
SLACK_BOT_TOKEN=<Your Slack Bot Token>
SLACK_SIGNING_SECRET=<Your Slack Signing Secret>
SLACK_APP_TOKEN=<Your Slack App Token>
```

## Slack App Setup

1. Create a new app in your Slack workspace.
2. Navigate to the "Socket Mode" section under "Settings" and enable it.
3. Navigate to the "Basic Information" section under "Settings" and scroll down to "App Credentials". Here, you will find your "Signing Secret" and "App Token" (under "Tokens for Your Workspace").
4. Navigate to the "OAuth & Permissions" section under "Features". Here, you will find your "Bot Token".
5. In the "Scopes" section, add the following bot token scopes: `app_mentions:read`, `channels:history`, `channels:read`, `chat:write`, `commands`, `groups:history`, `groups:read`, `im:history`, `im:read`, `im:write`, `mpim:history`, `mpim:read`, `mpim:write`.
6. Enable Event Subscriptions under "Features" and add the following event subscriptions: `app_mention`.
7. Install the app to your workspace.

## Usage

1. Run `node index.js` or `npm run start` to start the bot.
2. Add the bot to a channel in your Slack workspace.
3. Mention the bot in a message with a question. For example: `@MendableAI How to create a product copilot?`
4. The bot will respond with an answer in a thread and provide sources for its information.

## Features

- The bot maintains a history of conversations, allowing it to provide context-aware answers.
- The bot provides sources for its answers, ensuring transparency and verifiability of information.
- The bot responds to direct messages as well as mentions in channels.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

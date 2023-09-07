# Mendable AI Discord Bot

This is a Discord bot that uses the Mendable API to answer questions and provide sources for the answers. It creates a new thread for each question asked and stores the history of the conversation.

## Features

- Starts a new thread for each question asked.
- Uses the Mendable API to answer questions and provide sources.
- Stores the history of the conversation.

## Setup

1. Clone this repository.
2. Install the required dependencies with `npm install`.
3. Create a `.env` file in the root directory of the project and add the following environment variables:
    - `MENDABLE_API_KEY`: Your Mendable API key.
    - `DISCORD_TOKEN`: Your Discord bot token.
    - `BOT_ID`: Your Discord bot ID.
4. Run the bot with `node index.js` or `npm run start`.

## Usage

To ask a question, mention the bot followed by your question. For example:

```
@MendableAI How to create a Mendable AI Discord Bot?
```

The bot will create a new thread, answer the question, and provide sources for the answer.

## Dependencies

- `discord.js`: A powerful library for interacting with the Discord API.
- `dotenv`: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.


## Creating a Discord Application and Getting the Necessary Tokens and Bot ID

1. **Create a Discord Application**
    - Go to the [Discord Developer Portal](https://discord.com/developers/applications).
    - Click on the `New Application` button.
    - Give your application a name and click `Create`.

2. **Create a Bot for the Application**
    - Click on the `Bot` tab on the left side of the application page.
    - Click on the `Add Bot` button on the right and confirm by clicking `Yes, do it!`.

3. **Get the Bot Token**
    - Still on the `Bot` tab, find the `Token` section.
    - Click on `Copy` to copy the bot token. This is your `DISCORD_TOKEN`.

5. **Get the Bot ID**
    - Go to the `General Information` tab on the left side of the application page.
    - Find the `Application ID` section and click `Copy`. This is your `BOT_ID`.

6. **Invite the Bot to Your Server**
    - Go to the `OAuth2` tab on the left side of the application page.
    - In the `Scopes` section, select `bot`.
    - In the `Bot Permissions` section, select the permissions your bot needs.
    - Copy the generated URL and open it in your web browser to invite the bot to your server.

5. **Get the Bot ID**
    - Right click on the bot name and select `Copy ID`. This is your `BOT_ID`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


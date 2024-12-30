const SlackAIApp = require('./index');

// Initialize the app with configuration
const slackApp = new SlackAIApp({
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
  SLACK_APP_TOKEN: process.env.SLACK_APP_TOKEN,
  LLM_API_URL: process.env.LLM_API_URL,
  enableUserIdentification: false,
  DATABASE_URL: process.env.DATABASE_URL
});

// Start the app
slackApp.start();

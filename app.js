const { App } = require("@slack/bolt");
const { logAllEvents } = require("./events/logEvents");
require("dotenv").config({ path: ".env.local" });
const { identifyUser } = require("./middlewares/identifyUser");
const { assistant } = require("./ai-actions/assistant");



const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
  
});

logAllEvents(app);
app.use(identifyUser);
app.assistant(assistant);

// app initiate
(async () => {
  try {
    await app.start();
    console.log("⚡️ Bolt app is running in socket mode!");
  } catch (error) {
    console.error('Error starting app:', error);
  }
})();

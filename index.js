const { App } = require("@slack/bolt");
const { logAllEvents } = require("./events/logEvents");
const { identifyUser } = require("./middlewares/identifyUser");
const { assistant } = require("./ai-actions/assistant");

class SlackAIApp {
  constructor(config = {}) {
    // Validate required configurations
    const requiredConfigs = ['SLACK_BOT_TOKEN', 'SLACK_SIGNING_SECRET', 'SLACK_APP_TOKEN'];
    const missingConfigs = requiredConfigs.filter(key => !config[key]);
    
    if (missingConfigs.length > 0) {
      throw new Error(`Missing required configurations: ${missingConfigs.join(', ')}`);
    }

    // Initialize the Slack app
    this.app = new App({
      token: config.SLACK_BOT_TOKEN,
      signingSecret: config.SLACK_SIGNING_SECRET,
      socketMode: true,
      appToken: config.SLACK_APP_TOKEN
    });

    // Set environment variables if provided
    if (config.LLM_API_URL) {
      process.env.LLM_API_URL = config.LLM_API_URL;
    }

    // Set DATABASE_URL if provided
    if (config.DATABASE_URL) {
      process.env.DATABASE_URL = config.DATABASE_URL;
    }

    // Store user identification preference (default to false)
    this.enableUserIdentification = config.enableUserIdentification || false;

    // Initialize features
    this.initializeFeatures();
  }

  initializeFeatures() {
    // Always initialize event logging
    logAllEvents(this.app);
    
    // Only initialize user identification if enabled
    if (this.enableUserIdentification) {
      console.log('User identification enabled');
      this.app.use(identifyUser);
    }

    // Initialize assistant
    this.app.assistant(assistant);
  }

  async start() {
    try {
      await this.app.start();
      console.log("⚡️ Slack AI Assistant is running!");
      if (this.enableUserIdentification) {
        console.log("🔍 User identification is enabled");
      } else {
        console.log("ℹ️ User identification is disabled");
      }
      return this.app;
    } catch (error) {
      console.error('Error starting app:', error);
      throw error;
    }
  }
}

module.exports = SlackAIApp;

# Slack AI Assistant by Retoolify 🤖

<div align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/slack/slack-original.svg" alt="slack" width="100" height="100"/>
  <img src="https://www.vectorlogo.zone/logos/openai/openai-icon.svg" alt="openai" width="100" height="100"/>
</div>

<div align="center">
  <strong>A powerful, modular Slack AI assistant with customizable LLM backend support</strong>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/status-work%20in%20progress-yellow" alt="Work in Progress"/>
  <img src="https://img.shields.io/badge/license-Custom%20Private%20Use-blue" alt="License"/>
  <img src="https://img.shields.io/badge/node-%3E%3D14.0.0-green" alt="Node Requirement"/>
</div>

## 🚧 Work in Progress

This project is actively under development. New features and improvements are being added regularly.

## ✨ Key Features

- 🔌 **Pluggable LLM Backend**: Use any LLM service (OpenAI, Anthropic, or your own) by configuring the endpoint
- 🔐 **Optional User Authentication**: Built-in Prisma-based user management system
- 💾 **Efficient Caching**: Optimized response times with built-in caching
- 🎯 **Modular Design**: Enable/disable features based on your needs
- 🔄 **Real-time Updates**: Socket mode for instant message handling
- 📝 **Conversation Context**: Maintains chat history for better responses

## 🌟 Why Choose This Package?

The standout feature of this package is its ability to connect to any LLM backend service. This flexibility means you can:

- 🏢 Use your company's private LLM deployment
- 🔄 Switch between different LLM providers
- 🛠️ Implement custom preprocessing/postprocessing
- 💰 Control costs by managing requests
- 🔒 Maintain data privacy by keeping sensitive information in-house

## 🚀 Quick Start

### Installation

\`\`\`bash
npm install slack-ai-app-retoolify
\`\`\`

### Basic Usage

\`\`\`javascript
const SlackAIApp = require('slack-ai-app-retoolify');

const app = new SlackAIApp({
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
  SLACK_APP_TOKEN: process.env.SLACK_APP_TOKEN,
  LLM_API_URL: 'your-llm-endpoint'  // Optional: defaults to local endpoint
});

app.start();
\`\`\`

## 🔧 Configuration

Create a \`.env\` file based on the provided \`.env.sample\`:

\`\`\`env
# Required Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_SIGNING_SECRET=your-secret
SLACK_APP_TOKEN=xapp-your-token

# Optional LLM Configuration
LLM_API_URL=your-endpoint  # Default: http://localhost:3001/slack/llm

# Optional User Authentication
DATABASE_URL=your-database-url
ENABLE_USER_IDENTIFICATION=false
\`\`\`

## 📚 User Authentication Setup

If you want to enable user authentication:

1. Install Prisma:
\`\`\`bash
npm install @prisma/client
npx prisma init
\`\`\`

2. Use the provided schema in \`prisma/schema.prisma\`:
\`\`\`prisma
model Users {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  isDeleted Boolean  @default(false)
  isActive  Boolean  @default(true)
  slackUser String?  @unique
}
\`\`\`

3. Initialize the database:
\`\`\`bash
npx prisma migrate dev
\`\`\`

4. Enable user identification in your app configuration:
\`\`\`javascript
const app = new SlackAIApp({
  // ... other config
  enableUserIdentification: true,
  DATABASE_URL: process.env.DATABASE_URL
});
\`\`\`

## 📜 License

This software is licensed for private use within companies only. It may be used to create internal Slack applications but may not be used to create and sell commercial products. Contact the author for commercial licensing options.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

## 📞 Contact

If you like this app and want to build similar features for your custom use case, feel free to connect with me:

[Connect on LinkedIn](https://www.linkedin.com/in/vijaysingh-softwareengineer-italy/) <!-- Replace with your LinkedIn profile URL -->

---

<div align="center">
  Made with ❤️ by <a href="https://www.linkedin.com/in/vijaysingh-softwareengineer-italy/">Vijay Singh</a>
</div>

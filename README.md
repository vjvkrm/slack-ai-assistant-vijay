# Slack AI Assistant by Retoolify 🤖

<div align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/slack/slack-original.svg" alt="slack" width="100" height="100"/>
  &nbsp;&nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ai" width="100" height="100"/>
</div>

<div align="center">
  <h3>A powerful, modular Slack AI assistant with customizable LLM backend support</h3>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/status-work%20in%20progress-yellow" alt="Work in Progress"/>
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

## 🚀 Getting Started

### Prerequisites

1. Create a Slack App in your workspace with the following permissions:
   - app_mentions:read
   - chat:write
   - im:history
   - users:read
   - users:read.email

2. Enable Socket Mode in your Slack App settings

### Installation

```bash
npm install slack-ai-app-retoolify
```

### Configuration

1. Create a `.env` file in your project root:

```env
# Required: Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-bot-token        # Found in OAuth & Permissions
SLACK_SIGNING_SECRET=your-signing-secret    # Found in Basic Information
SLACK_APP_TOKEN=xapp-your-app-token        # Generated when enabling Socket Mode

# Optional: LLM Configuration
LLM_API_URL=your-llm-endpoint              # Your LLM service endpoint
```

2. Initialize and start the app:

```javascript
require('dotenv').config();
const SlackAIApp = require('slack-ai-app-retoolify');

const app = new SlackAIApp({
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
  SLACK_APP_TOKEN: process.env.SLACK_APP_TOKEN,
  LLM_API_URL: process.env.LLM_API_URL,     // Optional
  enableUserIdentification: false           // Optional: Enable user auth
});

app.start();
```

## 📚 Advanced: User Authentication

If you want to enable user authentication:

1. Install Prisma:
```bash
npm install @prisma/client
npx prisma init
```

2. Add this schema to `prisma/schema.prisma`:
```prisma
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
```

3. Set up your database:
```bash
npx prisma migrate dev
```

4. Update your configuration:
```env
DATABASE_URL="your-database-url"
ENABLE_USER_IDENTIFICATION=true
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

## 📞 Contact

If you like this app and want to build similar features for your custom use case, feel free to connect with me:

[Connect on LinkedIn](https://www.linkedin.com/in/vijaysingh-softwareengineer-italy/)

---

<div align="center">
  Made with ❤️ by <a href="https://www.linkedin.com/in/vijaysingh-softwareengineer-italy/">Vijay Singh</a>
</div>

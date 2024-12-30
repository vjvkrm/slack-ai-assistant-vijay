const { LogLevel, Assistant } = require("@slack/bolt");
const {llmBackend} = require("./llmApiCall");


const assistant = new Assistant({
  // still need to implement new thread Home prompts
  threadStarted: async ({
    say,
    saveThreadContext,
    setStatus,
    setSuggestedPrompts,
    setTitle,
  }) => {
    console.log("threadStarted");
    setTitle("Welcome to the AI Assistant!");
    setSuggestedPrompts(["What can I help you with?" ]);
  },

  ///
  /// handleIncoming messages
  ///
  userMessage: async ({ say, setStatus, context, client, message }) => {
    const { channel, thread_ts } = message;
    await setStatus("thinking...");
    const prevMessages = await client.conversations.replies({
      channel,
      ts: thread_ts,
      oldest: thread_ts,
    });

    const userMessage = { role: "user", text: message.text };
    const threadHistory = prevMessages.messages
      .map((m) => {
        const role = m.bot_id ? "assistant" : "user";
        return { role, text: m.text };
      })
      .slice(-6);

    // now here is when we implement LLM service to generate and send response to user // we still need to send context and implment other features 
   // pending updates on sending channel history
    const response = await llmBackend(userMessage.text)

    await say(
      `${response}`
    );

    console.log("\n\n\n\nmessage", threadHistory);
    console.log("context", context);
  },
});

module.exports = { assistant };

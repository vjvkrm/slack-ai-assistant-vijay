const logAllEvents = (app) => {
  // Log ALL incoming events using the built-in middleware
  app.use(async (args) => {
    const { payload, event, message, command, action, body, context, next } = args;

    const eventType = event?.type || message?.type || command?.type || action?.type || body?.type || "unknown";
    
    console.log("\n🔔 New Request Received 🔔");
    console.log("📅 Time:", new Date().toISOString());
    console.log("📝 Event Type:", eventType);
    
    if (message) {
      console.log("💬 Message Details:", {
        text: message.text,
        user: message.user,
        channel: message.channel,
        thread_ts: message.thread_ts
      });
    }

    if (event) {
      console.log("🎯 Event Details:", {
        type: event.type,
        user: event.user,
        channel: event.channel
      });
    }

    if (command) {
      console.log("⚡ Command Details:", {
        command: command.command,
        text: command.text,
        user: command.user_id,
        channel: command.channel_id
      });
    }

    await next();
  });

  // Log all message events
  // app.message('*', async ({ message, say }) => {
  //     console.log('\n💬 Message Event:', {
  //         type: 'message',
  //         user: message.user,
  //         text: message.text,
  //         channel: message.channel,
  //         ts: message.ts,
  //         fullMessage: message
  //     });
  // });

  // Log all slash commands
  // app.command('*', async ({ command, ack }) => {
  //     await ack();
  //     console.log('\n⚡ Slash Command:', command);
  // });

  // Log all interactive actions (buttons, select menus, etc.)
  // app.action('*', async ({ action, ack }) => {
  //     await ack();
  //     console.log('\n🎯 Interactive Action:', action);
  // });

  // Log all view submissions (modals)
  // app.view('*', async ({ view, ack }) => {
  //     await ack();
  //     console.log('\n👁️ View Submission:', view);
  // });

  // Log all shortcuts
  // app.shortcut('*', async ({ shortcut, ack }) => {
  //     await ack();
  //     console.log('\n⚡ Shortcut:', shortcut);
  // });

  // Log all events using the catch-all event listener
  // app.event('*', async ({ event, context }) => {
  //     console.log('\n📢 Slack Event:', {
  //         type: event.type,
  //         event: event,
  //         context: context
  //     });
  // });

  // app.event('assistant_thread_started', async ({ event}) =>{
  //     console.log(event)
  //     console.log("///// events context")
  //     console.log(event.assistant_thread.context)
  // } )
};

module.exports = { logAllEvents };

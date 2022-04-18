const tmi = require("tmi.js");
require('dotenv').config();

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();


// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "確實" || count === 10) {
   
    saySometing(target);
    count = 0;
    console.log(`* Executed ${commandName} command`);
  } else {
    count ++;
    console.log(`* Unknown say ${commandName}`);
  }
}

var respond = ["確實","亂講","冷靜","真假"];

function saySometing(target) {
  client.say(
    target,
    `${respond[Math.floor(Math.random()*4)]} `
  );
}




// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

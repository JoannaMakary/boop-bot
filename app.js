//=========================//
// Welcome to the BOOP-BOT //
//=========================//

// Check and try Load Discord.js library
try {
  var Discord = require('discord.js');
} catch (e) {
  console.log('Discord.js does not exist. Run npm install --save discord.js in the project folder.')
  process.exit();
}

// Check for config file
try {
  require.resolve("./config.json");
} catch (e) {
  console.log('Configuration (config.json) file is missing.')
  process.exit();
}

// Load config file
try {
  var config = require("./config.json");
} catch (e) {
  console.log("Unable to parse config file: " + e);
  process.exit(1);
}

// Client (bot/self)
var bot = new Discord.Client();

bot.on('message', message => {
  // arguments for the command
  let args = message.content.slice(config.prefix.length).trim().split(' ');
  // command following prefix
  let cmd = args.shift().toLowerCase();

  // ignore other bots
 if(message.author.bot) return; 

  // if boop-bot is mentioned
  if (message.content.match(/boop-bot/gmi)) {
    message.channel.send('Did I hear something? Or was that the wind...');
  }

  // if it does not have a prefix
  if(!message.content.startsWith(config.prefix)) return;

  // command handler
  try {
    // auto-reload
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];
    // require that command file
    let commandFile = require(`./commands/${cmd}.js`)
    commandFile.run(bot, message, args);
  } catch (e) {
    console.log(e.stack);
  }
});

bot.on('ready', function(){
  console.log(`Started ${bot.user.tag}`);
});

bot.on('disconnected', function(){
  console.log(`Disconnected from the server`);
});

// Configuration in config.json file
bot.login(config.token);
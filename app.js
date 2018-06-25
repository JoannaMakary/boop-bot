//=========================//
// Welcome to the BOOP-BOT //
//=========================//

// Load Discord.js library
const Discord = require('discord.js');
// Client (bot/self)
const bot = new Discord.Client();
// Config file for token and prefix
const config = require("./config.json");
// Logger
// bot.logger = require("./util/Logger");
// Functions
// require("./modules/functions.js")(bot);

bot.on('ready', () => {
  console.log(`Started ${bot.user.tag}`);
  console.log(`${bot.user.tag}`)
});

// Commands for incoming messages
bot.on("message", async message => {
    // Ignore bots and non pre-fix commands
    if (message.author.bot) return;

    // Separate command and args
    // const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    // const command = args.shift().toLowerCase();

    // Commands only for owner
    // if(message.author.id == config.ownerID) {
    //    message.channel.send('Hi Jo');
    // }

    var d = new Date();
    // Tell the Date
    if (message.content.match(config.prefix + ' date')) {
      message.channel.send(d.toDateString());
    }

    // Tell the Time (HH:MM:SS)
    if (message.content.match(config.prefix + ' time')) {
      message.channel.send( ("0" + (d.getHours()) % 12).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2));;
    }

    // If boop-bot is mentioned
    if (message.content.match(/boop-bot/gmi)) {
      message.channel.send('Did I hear something? Or was that the wind...');
    }
  });

// Message for new members
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'member-log');
    if (!channel) return;
    channel.send('Welcome to the dark side ${member}');
});

// Configuration in config.json file
bot.login(config.token);
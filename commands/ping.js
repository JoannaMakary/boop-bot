// If user says ping, reply with pong

exports.run = (bot, message, args) => {
    message.channel.send('PONG!');
}
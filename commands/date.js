// Tell the current date

var d = new Date();

exports.run = (bot, message, args) => {
    message.channel.send(d.toDateString());
}
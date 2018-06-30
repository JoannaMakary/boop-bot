// Tell the time (HH:MM:SS)

var d = new Date();

// converting timezone offset
function seconds_with_leading_zeros(dt) 
{ 
  return /\((.*)\)/.exec(new Date().toString())[1];
}

exports.run = (bot, message, args) => {
    message.channel.send( ("0" + (d.getHours()) % 12).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + " " + seconds_with_leading_zeros(d));
}
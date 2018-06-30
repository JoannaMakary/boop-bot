var request = require('request');
var cheerio = require('cheerio');

exports.run = (bot, message, args) => {
    request('http://www.memedroid.com/memes/random', function(err, resp, body){
        if(err) {
            throw err;
        } else {
            var $ = cheerio.load(body);
            // Randomize selection
            $.fn.random = function() {
                return this.eq(Math.floor(Math.random() * this.length));
            }
            // Grab from Memedroid
            var src = $('img.img-responsive').random().attr("src");
            // If it is a local/placeholder image, re-assign src
            while(src.startsWith("/images/")) {
                src = $('img.img-responsive').random().attr("src");
            }
            // Send the message (image) to the server
            message.channel.send({file: src});
            // For debugging
            // console.log(src);
        }
    });
}
const Commando = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class policeCommand extends Commando.Command {

  constructor(client) {

    super(client, {

      name:"police",
      group:"reactions",
      memberName:"police",
      description:"*siren*",

    });

  }

  run(message) {

    let police = ["https://media1.tenor.com/images/b87de85650b85bda6342261d516b7482/tenor.gif?itemid=7744617","https://www.mypalmbeachpost.com/rf/image_medium/Pub/Web/PalmBeachPost/Images/STOCK%20BN%20Police%20car%20blurred.jpg"]

    const embed = new RichEmbed()
      .setImage(police[Math.floor(Math.random() * police.length)]);
    message.channel.send({embed});

  }

};

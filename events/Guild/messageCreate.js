const { Events } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if(message.author.bot || !message.guild) return;

    let contents = message.content.toLowerCase();
    let triggers = await db.get(`custom-respond-trigger_${message.guild.id}`);
    let responds = await db.get(`custom-respond-respond_${message.guild.id}`);
    if (!triggers || triggers.length === 0) return;

    for (let i = 0; i < triggers.length; i++) {
      let trigger = triggers[i].toLowerCase();
      if(contents === trigger) {
        let respond = responds[i];
        message.reply({
          content: `${respond}`,
          allowedMentions: {
            repliedUser: false
          }
        });
        break;
      };
    };
  },
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('smile')
    .setDescription('Senyum, dah itu aja')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await fetch('https://api.waifu.pics/sfw/smile');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setAuthor({ name: 'Smile' })
        .setImage(json.url)
      ],
    });
  },
};
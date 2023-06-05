const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wink')
    .setDescription('Kedip mata, dah itu aja')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await fetch('https://api.waifu.pics/sfw/wink');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setAuthor({ name: 'Wink' })
        .setImage(json.url)
      ],
    });
  },
};
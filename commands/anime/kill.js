const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Yes, kill.')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await fetch('https://api.waifu.pics/sfw/kill');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setAuthor({ name: 'Kill' })
        .setImage(json.url)
      ],
    });
  },
};
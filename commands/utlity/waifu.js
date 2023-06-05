const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('waifu')
    .setDescription('Nyari waifu masbro?')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await fetch('https://api.waifu.pics/sfw/waifu');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setTitle('New Waifu')
        .setImage(json.url)
      ],
    });
  },
};
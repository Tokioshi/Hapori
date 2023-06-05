const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick-anime')
    .setDescription('Kick atau dalam bahasa Indonesia nendang')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin ditendang')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/kick');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`${interaction.user} **kick** ${member}`)
        .setImage(json.url)
      ],
    });
  },
};
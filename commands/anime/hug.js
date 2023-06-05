const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Hug atau dalam bahasa Indonesia memeluk')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin dipeluk')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/hug');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setAuthor({ name: `${interaction.user} hug ${member}` })
        .setImage(json.url)
      ],
    });
  },
};
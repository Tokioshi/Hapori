const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('highfive')
    .setDescription('Highfive atau dalam bahasa Indonesia tos')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin ditos')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/highfive');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setAuthor({ name: `${interaction.user} highfive with ${member}` })
        .setImage(json.url)
      ],
    });
  },
};
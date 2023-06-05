const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bonk')
    .setDescription('Intinya mukul pala orang, dah itu aja')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin dibonk')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/bonk');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`${interaction.user} **bonk** ${member}`)
        .setImage(json.url)
      ],
    });
  },
};
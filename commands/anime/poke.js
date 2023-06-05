const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poke')
    .setDescription('WOI POKE')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin dicolek')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/poke');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`${interaction.user} **poke** ${member}`)
        .setImage(json.url)
      ],
    });
  },
};
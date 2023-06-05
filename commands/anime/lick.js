const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lick')
    .setDescription('Lick atau dalam bahasa Indonesia menjilat')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin dijilat')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/lick');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setTitle(`${interaction.user} lick ${member}`)
        .setImage(json.url)
      ],
    });
  },
};
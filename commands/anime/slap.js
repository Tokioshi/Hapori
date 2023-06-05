const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Slap atau dalam bahasa Indonesia nampol')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin ditampol')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/slap');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setTitle(`${interaction.user} slap ${member}`)
        .setImage(json.url)
      ],
    });
  },
};
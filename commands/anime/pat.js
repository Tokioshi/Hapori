const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pat')
    .setDescription('Pat atau dalam bahasa Indonesia mengelus')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin dielus')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/pat');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setTitle(`${interaction.user} pat ${member}`)
        .setImage(json.url)
      ],
    });
  },
};
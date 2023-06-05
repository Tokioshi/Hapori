const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('handhold')
    .setDescription('Handhold atau dalam bahasa Indonesia pegangan tangan')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin dipegang')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/handhold');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setTitle(`${interaction.user} handhold with ${member}`)
        .setImage(json.url)
      ],
    });
  },
};
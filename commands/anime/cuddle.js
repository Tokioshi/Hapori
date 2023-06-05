const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cuddle')
    .setDescription('Cuddle atau dalam bahasa Indonesia berpelukan')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin dipeluk')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/cuddle');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setAuthor({ name: `${interaction.user} cuddle with ${member}` })
        .setImage(json.url)
      ],
    });
  },
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bite')
    .setDescription('Bite atau dalam bahasa Indonesia menggigit')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Seseorang yang ingin dipeluk')
      )
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getUser('user') || interaction.client.user;
    let res = await fetch('https://api.waifu.pics/sfw/bite');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`${interaction.user} **bite** ${member}`)
        .setImage(json.url)
      ],
    });
  },
};
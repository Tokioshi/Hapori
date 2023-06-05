const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nom')
    .setDescription('Gak tau mau isi apa')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await fetch('https://api.waifu.pics/sfw/nom');
    let json = await res.json();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setAuthor({ name: 'Nom' })
        .setImage(json.url)
      ],
    });
  },
};
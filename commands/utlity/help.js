const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Melihat list perintah bot')
    .setDMPermission(false),
  async execute(interaction) {
    interaction.reply({ content: 'Coming soon...' });
  },
};
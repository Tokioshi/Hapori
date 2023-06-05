const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Melihat ping / kecepatan yang dimiliki bot untuk merespond')
    .setDMPermission(false),
  async execute(interaction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`🏓 Pong! | \`${interaction.client.ws.ping}\`ms!`)
      ]
    });
  },
};
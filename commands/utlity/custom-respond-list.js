const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('customrespondlist')
    .setDescription('Melihat list custom respond yang ada di database')
    .setDMPermission(false),
  async execute(interaction) {
    let data = await db.get(`custom-respond-trigger_${interaction.guild.id}`);

    if(!data || data.length === 0) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle('List Custom Respond Server Ini')
          .setColor('Navy')
          .setDescription('Tidak ada custom respond terdaftar.')
        ]
      });
    } else {
      const formattedData = data.map((item, index) => `${index + 1}. ${item}`);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle('List Custom Respond Server Ini')
          .setColor('Navy')
          .setDescription(formattedData.join('\n'))
        ]
      });
    };
  },
};
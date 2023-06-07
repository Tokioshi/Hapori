const { Events, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready and logged as ${client.user.tag}!`);
    client.user.setActivity('Competitive', { type: ActivityType.Playing });
  },
};
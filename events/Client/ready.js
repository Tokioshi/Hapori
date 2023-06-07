const { Events, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready and logged as ${client.user.tag}!`);
    client.user.setActivity('Competitive', { type: ActivityType.Playing });

    client.channels.cache.get('1093321530378813560').send({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setTitle('Verification Required')
        .setDescription('> If you want to unlock additional channels on Hapori, click the button below and the bot will automatically give you the <@&1089027827975864343> role.')
        .setFooter({ text: '・Hapori Staff Team' })
      ],
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('verify')
          .setLabel('Verify')
          .setEmoji('✅')
          .setStyle(ButtonStyle.Success)
        )
      ],
    });
  },
};
const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if(interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if(!command) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Perintah dengan nama \`${interaction.commandName}\` tidak ditemukan.`)
          ],
          ephemeral: true
        });
        return;
      };
  
      try {
        await command.execute(interaction)
      } catch (error) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Terjadi kesalahan ketika menjalankan perintah \`${interaction.commandName}\`.`)
          ],
          ephemeral: true
        });
        console.log(error);
      };
    };

    if(interaction.isButton()) {
      if(interaction.customId == 'verify') {
        if(interaction.member.roles.cache.has('1089027827975864343')) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setDescription('⛔ | You already verified!')
            ],
            ephemeral: true
          });
        };

        await interaction.member.roles.add('1089027827975864343').then(() => {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Green')
              .setDescription('✅ | Successfully verify!')
            ],
            ephemeral: true
          });
        }).catch((error) => {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor9('Red')
              .setDescription('⛔ | Fail verify, please report to <@1010474132753883207>!')
            ],
            ephemeral: true
          });
        });
      };
    };
  },
};
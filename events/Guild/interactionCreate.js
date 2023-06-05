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
  },
};
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
              .setDescription('⛔ **| You already verified!**')
            ],
            ephemeral: true
          });
        };

        await interaction.member.roles.add('1089027827975864343').then(() => {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Green')
              .setDescription('✅ **| Successfully verify!**')
            ],
            ephemeral: true
          }).then(() => {
            interaction.guild.channels.cache.get('1089027829917827115').send({
              content: `${member}`,
              embeds: [
                new EmbedBuilder()
                .setColor('Navy')
                .setTitle('Thank Your For Joining Hapori')
                .setDescription(`Welcome to Hapori Discord server! Please read our rules at <#1089027829724885047> and get some roles at <#1089027829724885050>! Have fun and enjoy this server!`)
              ]
            });
          });
        }).catch((error) => {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setDescription('⛔ **| Fail verify, please report to <@1010474132753883207>!**')
            ],
            ephemeral: true
          });
          console.log(error)
        });
      };
    };
  },
};
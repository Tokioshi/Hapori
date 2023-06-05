const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmute seseorang yang telah di mute')
    .addUserOption(option =>
      option.setName('member')
        .setDescription('Member yang akan diunmute')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getMember('member');

    if(!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak memiliki izin untuk menggunakan perintah ini!')
        ],
        ephemeral: true
      });
    };

    if(member.id === interaction.user.id) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Bagaimana kamu bisa menggunakan perintah ini?')
        ],
        ephemeral: true
      });
    } else if(member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Aku yakin mereka bisa menghilangkan role mute sendiri, bukan?')
        ],
        ephemeral: true
      });
    } else if(!interaction.member.roles.cache.has('1100715349135081482')) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Sepertinya member tersebut tidak memiliki role mute.')
        ],
        ephemeral: true
      });
    };

    if(alasan) {
      await member.roles.remove('1100715349135081482').then(() => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Navy')
            .setDescription(`${interaction.user} baru saja unmute ${member} dengan alasan: **${reason}**`)
          ]
        });
      }).catch((error) => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription('Terjadi kesalahan, silahkan coba lagi nanti.')
          ],
          ephemeral: true
        });
        console.log(error);
      });
    } else if(!alasan) {
      await member.roles.remove('1100715349135081482').then(() => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Navy')
            .setDescription(`${interaction.user} baru saja unmute ${member}!`)
          ]
        });
      }).catch((error) => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription('Terjadi kesalahan, silahkan coba lagi nanti.')
          ],
          ephemeral: true
        });
        console.log(error);
      });
    };
  },
};
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute seseorang dari server')
    .addUserOption(option =>
      option.setName('member')
        .setDescription('Member yang akan dimute')
        .setRequired(true)
    )
    .addUserOption(option =>
      option.setName('alasan')
        .setDescription('Alasan mengapa mute member tersebut')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getMember('member');
    let alasan = interaction.options.getString('alasan');

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
          .setDescription('Kamu tidak bisa mute diri sendiri!')
        ],
        ephemeral: true
      });
    } else if(member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak bisa mute seseorang yang memiliki izin administrator!')
        ],
        ephemeral: true
      });
    } else if(interaction.member.roles.cache.has('1100715349135081482')) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Sepertinya member tersebut telah di mute.')
        ],
        ephemeral: true
      });
    };

    if(alasan) {
      await member.roles.add('1100715349135081482').then(() => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Navy')
            .setDescription(`${interaction.user} baru saja mute ${member} dengan alasan: **${reason}**`)
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
      await member.roles.add('1100715349135081482').then(() => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Navy')
            .setDescription(`${interaction.user} baru saja mute ${member}!`)
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
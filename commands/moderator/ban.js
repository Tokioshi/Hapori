const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban seseorang dari dalam server')
    .addUserOption(option =>
      option.setName('member')
        .setDescription('Member yang akan di ban')
        .setRequired(true)  
    )
    .addStringOption(option =>
      option.setName('alasan')
        .setDescription('Alasan untuk ban member tersebut')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getMember('member');
    let reason = interaction.options.getString('alasan');

    if(!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
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
          .setDescription('Kamu tidak bisa ban diri sendiri!')
        ],
        ephemeral: true
      });
    } else if(!member.bannable) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Sepertinya aku tidak bisa ban member tesebut.')
        ],
        ephemeral: true
      });
    };

    if(alasan) {
      await member.ban().then(() => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Navy')
            .setDescription(`${interaction.user} baru saja banned \`${member.user.tag}\` dengan alasan: **${reason}**`)
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
      await member.ban().then(() => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Navy')
            .setDescription(`${interaction.user} baru saja banned \`${member.user.tag}\`!`)
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
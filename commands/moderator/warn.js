const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Beri peringatan kepada member di server')
    .addUserOption(option =>
      option.setName('member')
        .setDescription('Member yang akan diberi peringantan')
        .setRequired(true)  
    )
    .addStringOption(option =>
      option.setName('alasan')
        .setDescription('Alasan mengapa member tersebut diberi peringatan')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getMember('member');
    let alasan = interaction.options.getString('alasan');

    if(!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
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
          .setDescription('Kamu tidak bisa warn diri sendiri!')
        ],
        ephemeral: true
      });
    };

    if(alasan) {
      await db.add(`warn_${interaction.guild.id}, ${member.id}`, 1);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Navy')
          .setDescription(`${interaction.user} baru saja memperingati ${member} dengan alasan: **${reason}**`)
        ]
      });
    } else if(!alasan) {
      await db.add(`warn_${interaction.guild.id}, ${member.id}`, 1);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Navy')
          .setDescription(`${interaction.user} baru saja memperingati ${member}!`)
        ]
      });
    }
  },
};
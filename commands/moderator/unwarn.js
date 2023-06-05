const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unwarn')
    .setDescription('Untuk mengurangi jumlah peringatan member')
    .addUserOption(option =>
      option.setName('member')  
        .setDescription('Member yang akan dikurangi jumlah peringatannya')
        .setRequired(true)  
    )
    .addIntegerOption(option =>
      option.setName('jumlah')
        .setDescription('Jumlah peringatan yang akan dikurangi')
        .setMinValue(1)
        .setRequired(false)  
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
  async execute(interaction) {
    let member = interaction.options.getMember('member');
    let jumlah = interaction.options.getNumber('jumlah') || 1;

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
          .setDescription('Kamu tidak bisa unwarn diri sendiri!')
        ],
        ephemeral: true
      });
    };

    let data = await db.get(`warn_${interaction.guild.id}, ${member.id}`);
    if(data == null || data == 0) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Member tersebut tidak memiliki peringatan!')
        ],
        ephemeral: true
      });
    } else if(jumlah > data) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Member tersebut tidak memiliki peringatan sebanyak itu!')
        ],
        ephemeral: true
      });
    };

    await db.sub(`warn_${interaction.guild.id}, ${member.id}`, jumlah);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${interaction.user} baru saja mengurangi peringatan ${member} sebanyak **${jumlah}**!`)
      ]
    });
  },
};
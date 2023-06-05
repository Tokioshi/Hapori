const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = { 
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Membersihkan beberapa pesan di channel ini')
    .addNumberOption(option =>
      option.setName('jumlah')
      .setDescription('Jumlah pesan yang akan dihapus')
      .setMinValue(1)
      .setMaxValue(100)
      .setRequired(true)  
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
  async execute(interaction) {
    let jumlah = interaction.options.getNumber('jumlah');

    if(!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak memiliki izin untuk menggunakan perintah ini!')
        ],
        ephemeral: true
      });
    };

    await interaction.channel.bulkDelete(jumlah).then((msg) => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Navy')
          .setDescription(`${interaction.user} baru saja membersihkan \`${msg.size}\` pesan di channel ini!`)
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
  },
};
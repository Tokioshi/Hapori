const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nuke')
    .setDescription('Melakukan nuke channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak memiliki izin untuk menggunakan perintah ini!'),
        ],
        ephemeral: true,
      });
    };

    try {
      let channel = interaction.channel;
      let position = interaction.channel.position;
      let newChannel = await channel.clone();

      channel.delete();
      newChannel.setPosition(position);
      newChannel.send({ content: `Nuked by \`${interaction.user.tag}\`` });
    } catch (error) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Terjadi kesalahan, silahkan coba lagi nanti.')
        ],
        ephemeral: true
      });
      console.log(error);
    };
  },
};
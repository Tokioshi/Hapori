const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deletecustomrespond')
    .setDescription('Menghapus custom respond')
    .addStringOption(option =>
      option.setName('trigger')
        .setDescription('Trigger custom respond yang ingin dihapus')
        .setMaxLength(20)
        .setRequired(true)
      )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    let trigger = interaction.options.getString('trigger');

    if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak memiliki izin untuk menggunakan perintah ini!')
        ],
        ephemeral: true
      });
    };

    let data = await db.get(`custom-respond-trigger_${interaction.guild.id}`);
    let lowerCaseTrigger = trigger.toLowerCase();
    if(!data.some(item => item.toLowerCase() === lowerCaseTrigger)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Trigger tersebut belum terdafatar di database!')
        ],
        ephemeral: true
      });
    };

    let triggers = await db.get(`custom-respond-trigger_${interaction.guild.id}`);
    let responds = await db.get(`custom-respond-respond_${interaction.guild.id}`);
    let index = triggers.indexOf(trigger)

    if(index !== 1) {
      triggers.splice(index, 1);
      responds.splice(index, 1);

      await db.set(`custom-respond-trigger_${interaction.guild.id}`, triggers);
      await db.set(`custom-respond-respond_${interaction.guild.id}`, responds);
    };

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`${interaction.user} baru saja menghapus trigger custom respond \`${trigger}\`!`)
      ]
    });
  },
};
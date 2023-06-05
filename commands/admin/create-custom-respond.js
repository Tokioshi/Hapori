const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createcustomrespond')
    .setDescription('Membuat custom respond')
    .addStringOption(option =>
      option.setName('trigger')
        .setDescription('Trigger untuk custom respond')
        .setMaxLength(20)
        .setRequired(true)
      )
    .addStringOption(option =>
      option.setName('respond')
        .setDescription('Respond yang akan diberikan')
        .setMaxLength(200)
        .setRequired(true)
      )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    let trigger = interaction.options.getString('trigger');
    let respond = interaction.options.getString('respond');

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
    if(data) {
      if(data.some(item => item.toLowerCase() === lowerCaseTrigger)) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription('Trigger tersebut sudah terdaftar di database!')
          ],
          ephemeral: true
        });
      };
    };

    await db.push(`custom-respond-trigger_${interaction.guild.id}`, trigger);
    await db.push(`custom-respond-respond_${interaction.guild.id}`, respond);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle('Custom Respond Baru')
        .setColor('Navy')
        .addFields(
          { name: 'Trigger', value: `\`\`\`\n${trigger}\`\`\`` },
          { name: 'Respond', value: `\`\`\`\n${respond}\`\`\`` }
        )
        .setFooter({ text: `Ditambah oleh ${interaction.user.tag}` })
      ]
    });
  },
};
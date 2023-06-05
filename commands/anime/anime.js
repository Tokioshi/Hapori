const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { get } = require('request-promise-native');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anime')
    .setDescription('Mencari informasi tentang anime')
    .addStringOption(option =>
      option.setName('judul')
        .setDescription('Judul anime yang ingin dicari')
        .setRequired(true)
      )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    let title = interaction.options.getString('judul');

    let option = {
      url: `https://kitsu.io/api/edge/anime?filter[text]=${title}&page[limit]=3`,
      method: 'GET',
      headers: {
        'Content-Type' : 'application/vnd.api+json',
        'Accept' : 'application/vnd.api+json'
      },
      json: true
    };

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setDescription('🔎 | Looking for your anime...')
      ]
    }).then(() => {
      get(option).then((mat) => {
        let sts = mat.data[0].attributes.status;
        let up = sts.charAt(0).toUpperCase() + sts.slice(1);

        interaction.editReply({
          embeds: [
            new EmbedBuilder()
            .setColor('Navy')
            .setTitle(mat.data[0].attributes.titles.en_jp)
            .setURL(`https://kitsu.io/anime/${mat.data[0].id}`)
            .setThumbnail(mat.data[0].attributes.posterImage.original)
            .setDescription(mat.data[0].attributes.synopsis)
            .addFields(
              { name: 'Anime', value: `${mat.data[0].attributes.subtype}`, inline: true },
              { name: 'Episode', value: `${mat.data[0].attributes.episodeCount ? mat.data[0].attributes.episodeCount : 'N/A'}`, inline: true },
              { name: 'Duration', value: `${mat.data[0].attributes.episodeLength ? mat.data[0].attributes.episodeLength : 'N/A'}`, inline: true },
              { name:' Status', value: `${up}`, inline: true },
              { name: 'Start Date', value: `${mat.data[0].attributes.startDate}`, inline: true },
              { name: 'End Date', value: `${mat.data[0].attributes.endDate ? mat.data[0].attributes.endDate : 'N/A'}`, inline: true },
            )
            .setFooter({ text: `${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL({ extension: 'png' }) })
            .setTimestamp()
          ]
        });
      });
    });
  },
};
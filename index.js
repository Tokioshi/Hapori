const { Client, GatewayIntentBits, Collection } = require('discord.js');

class Bot extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.commands = new Collection();
    this.config = require('./handler/config.js');

    require('./handler')(this);
  };
};

const client = new Bot();
client.login(client.config.token);
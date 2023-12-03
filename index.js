// bot.js veya index.js dosyası

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Diğer gerekli importları ve ayarları buraya ekleyebilirsiniz

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);
});

// Botunuzun diğer olayları ve komutları buraya ekleyebilirsiniz

client.login('MTE3NTczMzYyMDEzMzA4MTA4OA.G-WpY4.-IjqCppuFkx9uCWg5k-KQQhFXGEOQT0RO4uAeU'); // 'TOKEN' kısmını Discord Developer Portal'dan alınan bot tokeninizle değiştirin

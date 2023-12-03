const { Client, Intents } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

const OPENAI_API_KEY = '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'; // OpenAI GPT-3 API anahtarınızı ekleyin
const TARGET_CHANNEL_ID = '1178053254274367539'; // Göndermek istediğiniz kanalın ID'sini ekleyin

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} is online!`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const userMessage = message.content;

  try {
    const botResponse = await generateGPTResponse(userMessage);

    // Belirli bir kanala mesaj gönderme
    const targetChannel = message.guild.channels.cache.get(TARGET_CHANNEL_ID);

    if (targetChannel) {
      targetChannel.send(botResponse);
    } else {
      console.error('Hedef kanal bulunamadı!');
    }
  } catch (error) {
    console.error('Kullanıcı mesajını işlerken hata:', error.message);
  }
});

async function generateGPTResponse(input) {
  const gptEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';

  try {
    const response = await axios.post(
      gptEndpoint,
      {
        prompt: input,
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('GPT tarafından cevap oluşturulurken hata:', error.message);
    return 'Üzgünüm, bir hata oluştu.';
  }
}

const token = 'MTE3NTczMzYyMDEzMzA4MTA4OA.G-WpY4.-IjqCppuFkx9uCWg5k-KQQhFXGEOQT0RO4uAeU'; // Discord botunuzun token'ını ekleyin
client.login(token);

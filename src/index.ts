require('dotenv').config()
import { Client, RichEmbed } from 'discord.js';
import  { googleSearch } from './modules/googleSearch';
import { recentSearches } from './modules/getRecentSearches';
const client = new Client()
const BOT_NAME = 'ryuk-node-bot';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('guildMemberAdd', member => {
  member.send(
    `Welcome on the server! Ryuk is fun! Death Note Rocks 😀`
  )
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
        return;
    }

    if (['Hi', 'hi', 'Hey', 'Hii', 'hii'].indexOf(msg.content) >= 0) {
        if (msg.author.username !== BOT_NAME) {
            msg.reply('Hey');
        }
        return;
    }

    if (msg.content.startsWith('!google')) {
        googleSearch(msg);
        return;
    }

    if (msg.content.startsWith('!recent')) {
        recentSearches(msg);
        return;
    }

    const helpString = 'I support these commands\n\n **!google** [query] \n\n **!recent** ?[query] \n\n **!help** \n\n **!kill** [name]';

    if (msg.content.startsWith('!help')) {
        msg.reply('\n\n I am Ryuk get ready for fun. \n\n' +  helpString);
        return;
    }

    if (msg.content.startsWith('!kill')) {
        const query = msg.content.replace('!kill', '');
        msg.reply(`**___DEATH NOTE___** \n\n ${query} is going down soon...... \n\n`);
        return;
    }

    if (msg.author.username !== BOT_NAME) {
        msg.channel.send(helpString);
    }

});

client.login(process.env.BOT_TOKEN);
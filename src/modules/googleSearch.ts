import { Message } from 'discord.js';
import { CONFIG } from '../config';
import axios from 'axios';
import RecentSearches from './recentSearchesCache';



const url = 'https://www.googleapis.com/customsearch/v1';

const fetchResultsFromGoogle = async (query: string) => {
    const { data } = await axios.get(url, {
        params: {
            key: process.env.GOOGLE_KEY,
            cx: CONFIG.googleCustomSearchEngine,
            q: query
        }
    });
    return data.items;
}


const buildMessage = (query: string, items: any[]) => {
    const headingLiteral = `Top 5 Search results from **${query }**`;

    let body = '';

    items.slice(0, 5).forEach((item: any) => {
        const result = `**${item.title}**\n${item.link}\n${item.snippet.replace('\n', ' ')}\n\n`
        body = body + result;
    });

    return (`\n${headingLiteral}\n\n${body}`);

}


export const googleSearch = async (message: Message) => {
    const query = message.content.replace('!google', '');
    try {
        const authorId = message.author.id;
        const results = await fetchResultsFromGoogle(query);
        const messageReplyString = buildMessage(query, results);
        console.log(messageReplyString);
        message.reply(messageReplyString);
        RecentSearches.addRecentSearches(authorId, query);
    } catch (e) {
        console.log(e);
        message.reply('Failed to search');
    }
};
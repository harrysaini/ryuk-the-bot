import RecentSearches from './recentSearchesCache';
import { Message } from 'discord.js';


const getRecentSearches = (authorId: string, query: string):string[] => {
    

    const searches: string[] = RecentSearches.getRecentSearched(authorId);

    if(typeof searches === 'undefined') {
        return [];
    }

    const filtered = searches.filter((search) => {
        return search.indexOf(query) >= 0;
    });

    return filtered;
}


const buildMessage = (query: string, searches: string[]) => {
    const headingLiteral = query ? `Recent searches including **${query}**` : `Recent searches are `;

    let body = '';

    searches.slice(0, 5).forEach((search: any) => {
        const result = `${search}\n`
        body = body + result;
    });

    return (`\n${headingLiteral}\n\n${body}`);

}


export const recentSearches = async (message: Message) => {
    const query = message.content.replace('!recent', '');
    try {
        const authorId = message.author.id;
        const results = getRecentSearches(authorId, query);
        const messageReplyString = buildMessage(query, results);
        console.log(messageReplyString);
        message.reply(messageReplyString);
    } catch (e) {
        console.log(e);
        message.reply('Failed to search');
    }
};
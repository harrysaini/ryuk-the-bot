import CacheWrapper from './cache';

const cacheId = 'google';
const cache = new CacheWrapper(cacheId, 1000 * 60);

class RecentSearches {

    static getRecentSearched(authorId: string): any {
        return cache.get(authorId);
    }

    static addRecentSearches(authorId: string, query: string) {
        const searches = cache.get(authorId) || [];
        searches.push(query);
        cache.set(authorId, searches);
    }
}

export default RecentSearches;
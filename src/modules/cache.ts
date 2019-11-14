import flatCache, {Cache} from 'flat-cache';
import path from 'path';

const cachePath = path.join( __dirname, '../../cache/');
console.log(cachePath);

class CacheWrapper {

    private cache: Cache;
    private persistInterVal: number;
    private interval: NodeJS.Timeout;

    constructor(id: string, persistInterVal: number) {
        this.cache = flatCache.load(id, cachePath);
        this.persistInterVal = persistInterVal;
        this.interval = this.startPersistInterVal();
    }

    startPersistInterVal() {
        return setInterval(() => {
            this.cache.save();
        }, this.persistInterVal)
    }

    stop() {
        clearInterval(this.interval);
    }

    set(key: string, value: any): void {
        this.cache.setKey(key, value);
    }

    get( key: string): any {
        return this.cache.getKey(key);
    }

}

export default CacheWrapper;
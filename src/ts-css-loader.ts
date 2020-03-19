import loader from 'css-loader';
import {generate} from './generate';

export default function (...args: any[]) {
    const async = () => {
        const cb = this.async();
        return (e, o) => {
            try {
                generate(this.resourcePath,
                    Object.keys(JSON.parse((o + '').replace(/[\s\S]*exports\.locals\s*=\s*([\s\S]*});\s+?[\s\S]*/mg, '$1')))
                    , this.query).then(() => cb(null, o), cb);
            } catch (e) {
                console.trace(e);
                cb(e, o);
            }
        }
    };
    return loader.call({...this, async}, ...args);
}
import loader from 'css-loader';
import {generate} from './generate';


export default function (...args: any[]) {
    const async = () => {
        const cb = this.async();
        return (e, o) => {
            if (e || o == null) {
                return cb(e, o);
            }
            try {
                const keys = Object.keys(JSON.parse((o + '').replace(/[\s\S]*exports\.locals\s*=\s*([\s\S]*});\s+?[\s\S]*/mg, '$1')));
                generate(this.resourcePath, keys, this.query).then(() => cb(null, o), cb);
            } catch (err) {
                console.trace(err);
                cb(err, o);
            }
        }
    };
    return loader.call({...this, async}, ...args);
}
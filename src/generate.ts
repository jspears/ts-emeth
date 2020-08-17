import {resolve} from "path";
import _template from './template';
import {EmethTSOptions} from './types';
import {importTemplate, writeFile as _writeFile} from './util';

const inCache = ((cache) => (key: string, keys: string[]): boolean => {
    const found = cache.get(key);
    if (!found) {
        cache.set(key, keys);
        return false;
    }
    if (found.length !== keys.length) {
        cache.set(key, keys);
        return false;
    }
    for (const f of keys) {
        if (!found.includes(f)) {
            cache.set(key, keys);
            return false;
        }
    }
    return true;

})(new Map<string, string[]>());


export const generate = async (resourcePath: string, exports: string[], {
    cwd = process.cwd(),
    extension = '.cssi.ts',
    template = _template,
    pattern,
    replace,
    writeFile = _writeFile
}: EmethTSOptions = {}) => {
    if (inCache(resourcePath, exports)) {
        return;
    }
    const templateFn = await importTemplate(cwd, template);
    const outFile = resolve(cwd, resourcePath).replace(/\.\w+?$/, extension);
    const content = await templateFn(outFile, exports.filter(Boolean), pattern, replace);
    if (content && content.trim()) {
        await writeFile(outFile, content, 'utf8');
    }
};
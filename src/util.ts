import {writeFile as _writeFile} from 'fs';
import {resolve} from 'path';
import {promisify} from 'util';
import {TemplateFn} from './types';

export const writeFile = promisify(_writeFile);
const STYLE_RE = /.+?\/(?:([^/]+?)\/styles|([^/]+?))\.(?:module\.css|cssm)$/;
export const fileToClassName = (fileName: string, pattern: string | RegExp = STYLE_RE, replace = '$1$2'): string => fileName.replace(pattern, replace);

export const dashesCamelCase = (str: string): string => {
    return str.replace(/-+(\w)/g, (_, firstLetter) => firstLetter.toUpperCase());
};

export const importTemplate = async (cwd: string, file: TemplateFn | string): Promise<TemplateFn> => {
    if (!file) {
        throw new Error(`Must provide a file`);
    }
    if (typeof file === 'function') {
        return file;
    }
    const ret = await import(resolve(cwd, file + ''));
    return (ret.default || ret) as TemplateFn;
};

import {writeFile as _writeFile} from 'fs';
import {resolve} from 'path';
import {promisify} from 'util';
import {TemplateFn} from './types';

export const writeFile = promisify(_writeFile);
const STYLE_RE = /^.+?\/(?:([^/]+?)\/styles(?:\.module)|([^/]+?))\.(?:module\.)?(?:css|css[im]?)(\.[jet]sx?)?$/;
export const fileToClassName = (fileName: string, pattern: string | RegExp = STYLE_RE, replace = '$1$2'): string =>{
  return fileName.replace(pattern, replace);

}


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

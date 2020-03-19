import {resolve} from "path";
import _template from './template';
import {EmethTSOptions} from './types';
import {importTemplate, writeFile as _writeFile} from './util';

export const generate = async (resourcePath: string, exports: string[], {
    cwd = process.cwd(),
    extension = '.cssi.ts',
    template = _template,
    writeFile = _writeFile
}: EmethTSOptions = {}) => {
    const templateFn = await importTemplate(cwd, template);
    const outFile = resolve(cwd, resourcePath).replace(/\.\w+?$/, extension);
    const content = await templateFn(outFile, exports.filter(Boolean));
    if (content && content.trim()) {
        await writeFile(outFile, content, 'utf8');
    }
};
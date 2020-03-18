import chalk from 'chalk';
import {resolve} from 'path';
import postcss from 'postcss';
import _template from './template';
import {EmethTSOptions} from './types';
import {importTemplate, dashesCamelCase, writeFile as _writeFile} from './util';


const resolveMessage = (message: postcss.ResultMessage): string | undefined => {
    if (message.type === 'export' && message.value) {
        return message.value.name || message.value;
    }
    if (message.type == 'replacer') {
        return message.value && message.value.localName;
    }
};

const plugin = postcss.plugin('ts-emeth', function ({
                                                        cwd = process.cwd(),
                                                        extension = '.cssi.ts',
                                                        localsConvention = 'camelCase',
                                                        template = _template,
                                                        writeFile = _writeFile
                                                    }: EmethTSOptions) {
    return async (root, result) => {
        const templateFn = await importTemplate(cwd, template);

        result.warnings().forEach(warning => console.warn(chalk.yellowBright(`WARN`), warning));

        const exports: string[] = [];

        for (const message of result.messages) {
            let name = resolveMessage(message);
            if (name) {
                switch (localsConvention) {
                    case 'camelCase': {
                        const cleanName = dashesCamelCase(name);
                        if (cleanName !== name) {
                            exports.push(name, cleanName);
                        } else {
                            exports.push(name);
                        }
                        break;
                    }

                    case 'camelCaseOnly': {
                        exports.push(dashesCamelCase(name));
                        break;
                    }
                    case 'asIs':
                    default:
                        exports.push(name);
                        break;
                }
            }
        }
        const outFile = resolve(cwd, result.opts.to).replace(/\.\w+?$/, extension);
        const content = await templateFn(outFile, exports);
        if (content && content.trim()) {
            await writeFile(outFile, content, 'utf8');
        }
    }
});

export default plugin;

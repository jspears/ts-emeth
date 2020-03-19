import postcss from 'postcss';
import {generate} from './generate';
import {EmethTSOptions} from './types';
import {dashesCamelCase} from './util';

const resolveMessage = (message: postcss.ResultMessage): string | undefined => {
    if (message.type === 'export' && message.value) {
        return message.value.name || message.value;
    }
    if (message.type == 'replacer') {
        return message.value && message.value.localName;
    }
};

const plugin = postcss.plugin('ts-emeth', function (opts: EmethTSOptions = {}) {
    return async (root, result) => {
        const exports: string[] = [];

        for (const message of result.messages) {
            let name = resolveMessage(message);
            if (name) {
                switch (opts.localsConvention || 'camelCase') {
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
        await generate(result.opts.to || result.opts.from, exports, opts);
    }
});

export default plugin;

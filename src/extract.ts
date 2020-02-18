import chalk from 'chalk';
import {icssParser} from 'css-loader/dist/plugins';
import {getModulesPlugins} from 'css-loader/dist/utils';
import * as fs from 'fs';
import {join, isAbsolute} from 'path';
import postcss from 'postcss';
import {promisify} from 'util';

const readFile = promisify(fs.readFile);

function dashesCamelCase(str) {
    return str.replace(/-+(\w)/g, (_, firstLetter) => firstLetter.toUpperCase());
}

export type Scope = {
    context?: string,
    remainingRequest?: string
}
export type Options = {
    localsConvention?: 'camelCase' | 'camelCaseOnly' | 'asIs'
}

export const transform = (_scope = {
    context: process.cwd(),
}, options = {
    localsConvention: 'camelCase'
}) => async (resourcePath: string): Promise<string[]> => {
    const scope: (Scope & { resourcePath: string }) = {
        ..._scope,
        resourcePath
    };
    const content = await readFile(isAbsolute(resourcePath) ? resourcePath : join(_scope.context, resourcePath), {encoding: 'utf8'});

    return postcss([...getModulesPlugins(options, scope), icssParser()]).process(content, {
        from: scope.remainingRequest || '',
        to: scope.resourcePath
    }).then(result => {
        result.warnings().forEach(warning => console.warn(chalk.yellowBright(`WARN`), warning));
        const exports = [];

        for (const message of result.messages) {
            if (message.type === 'export')
                exports.push(message.value && message.value.name || message.value);
            else if (message.type == 'replacer') {
                exports.push(message.value.localName);
            }
        }

        return exports.reduce((ret, name) => {
            switch (options.localsConvention) {
                case 'camelCase': {
                    const cleanName = dashesCamelCase(name);
                    if (cleanName !== name) {
                        ret.push(name, cleanName);
                    } else {
                        ret.push(name);
                    }
                    return ret;
                }

                case 'camelCaseOnly': {
                    ret.push(dashesCamelCase(name));
                    return ret;
                }
                case 'asIs':
                default:
                    ret.push(name);
                    return ret;
            }
        }, []);
    });
};


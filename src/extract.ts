import * as fs from 'fs';
import {isAbsolute, join} from 'path';
import postcss from 'postcss';
import {promisify} from 'util';
import plugin from './postcss-plugin';
import {EmethTSOptions, Run} from './types';

const readFile = promisify(fs.readFile);


export type Scope = {
    context?: string,
    remainingRequest?: string
}

export const extract = (options: EmethTSOptions): Run => async function (resourcePath: string): Promise<void> {
    const scope: (Scope & { resourcePath: string }) = {
        context: options.cwd,
        resourcePath,
    };
    const from = isAbsolute(resourcePath) ? resourcePath : join(process.cwd(), scope.context, resourcePath);

    const content = await readFile(from, {encoding: 'utf8'});
    await postcss(plugin(options)).process(content, {
        from,
        to: resourcePath,

    });
};


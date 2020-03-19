import {icssParser} from 'css-loader/dist/plugins';
import {getModulesPlugins} from 'css-loader/dist/utils';
import * as fs from 'fs';
import {join, isAbsolute} from 'path';
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
        resourcePath
    };
    const content = await readFile(isAbsolute(resourcePath) ? resourcePath : join(scope.context, resourcePath), {encoding: 'utf8'});
    await postcss([...getModulesPlugins(options, scope), icssParser(), plugin(options)]).process(content, {
        from: scope.remainingRequest || '',
        to: resourcePath
    });
};


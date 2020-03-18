import * as chokidar from 'chokidar';
import {extract} from "./extract";
import {EmethTSOptions} from './types';

export type WatcherOptions = EmethTSOptions & {
    persistent?: boolean,
    verbose?: boolean,
    path: string[] | string,
    outDir?: string
}

export const watcher = async (opts: WatcherOptions | undefined | void) => {
    if (!opts) {
        console.warn(`No options passed`);
        process.exit(1);
    }
    if (opts.verbose) {
        console.log(opts.persistent ? 'watching' : 'transforming', opts.path);
    }

    const createFile = await extract(opts);

    return chokidar.watch(opts.path, {awaitWriteFinish: true, persistent: opts.persistent, cwd: opts.cwd})
        .on('add', createFile)
        .on('change', createFile);
};
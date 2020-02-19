import chalk from "chalk";
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import {isAbsolute, parse as pathParse, format, relative, join} from 'path';
import {promisify} from 'util';
import {transform} from "./extract";
import {template as _template} from "./template";

const writeFile = promisify(fs.writeFile);


const verbose = process.argv.includes('-v', 2) || process.argv.includes('--verbose', 2);


export type TemplateFn = (fileName: string, keys: string[]) => string;

export type Options = {
    persistent?: boolean,
    verbose?: boolean,
    path: string[] | string,
    template?: TemplateFn | string,
    cwd?: string,
    outDir?: string,
    extension?: string,
    localsConvention?: 'asIs' | 'camelCase' | 'camelCaseOnly',
}

const importTemplate = async (file: string): Promise<TemplateFn> => {
    const ret = await import(file);
    return (ret.default || ret) as TemplateFn;
};


type Run = (fileName: string) => Promise<void | string>;
export const transformFile = async ({
                                        cwd = process.cwd(),
                                        localsConvention,
                                        template = _template,
                                        outDir,
                                        extension = ''
                                    }: Options): Promise<Run> => {
    const extract = transform({context: cwd}, {localsConvention});

    const templateFn = typeof template === 'function' ? template : await importTemplate(template);
    return (filePath): Promise<string | void> => extract(filePath).then(keys => templateFn(filePath, keys)).then(async (content) => {
        const parts = {...pathParse(filePath), base: undefined, ext: extension};
        const fName = format(parts);
        const outFile = outDir ? relative(outDir, fName) : isAbsolute(fName) ? fName : join(cwd, fName);
        if (verbose) {
            console.log(chalk.yellowBright('Writing'), fName);
        }
        await writeFile(outFile, content, {encoding: 'utf8'});
        return outFile;
    });
};

export const watcher = async (opts: Options | undefined | void) => {
    if (!opts) {
        console.warn(`No options passed`);
        process.exit(1);
    }
    if (opts.verbose) {
        console.log(opts.persistent ? 'watching' : 'transforming', opts.path);
    }
    const createFile = await transformFile(opts);

    return chokidar.watch(opts.path, {persistent: opts.persistent, cwd: opts.cwd})
        .on('add', createFile)
        .on('change', createFile);
};
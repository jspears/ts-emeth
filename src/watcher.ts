import * as chalk from "chalk";
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import {isAbsolute, relative, join} from 'path';
import {promisify} from 'util';
import {transform} from "./extract";
import {template as _template} from "./template";

const writeFile = promisify(fs.writeFile);


const verbose = process.argv.includes('-v', 2) || process.argv.includes('--verbose', 2);


export type TemplateFn = (fileName: string, keys: string[]) => string;

export type Options = {
    watch?: boolean,
    verbose?: boolean,
    path: string,
    template?: TemplateFn | string,
    cwd?: string,
    outDir?: string,
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
                                        outDir
                                    }: Options): Promise<Run> => {
    const extract = transform({context: cwd}, {localsConvention});

    const templateFn = typeof template === 'function' ? template : await importTemplate(template);
    return (filePath): Promise<string | void> => extract(filePath).then(keys => templateFn(filePath, keys)).then(async (content) => {
        const fName = `${filePath}.ts`;
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
    const createFile = await transformFile(opts);
    chokidar.watch(opts.path, {cwd: opts.cwd, persistent: opts.watch}).on('all', (event, path) => {
        return createFile(path);
    });
};
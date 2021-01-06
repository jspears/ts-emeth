import {Arg} from "ts-arg";
import {LocalsConvention, TemplateFn} from "./types";
import {WatcherOptions} from './watcher';


export class Options implements WatcherOptions {

    @Arg({short: 'w', long: 'watch', description: 'Watch the path for changes'})
    persistent: boolean = false;

    @Arg('Increase verbosity')
    verbose?: boolean;

    @Arg({description: 'Path to watch', default: true, required: true})
    path: string[];

    @Arg('Template function to use')
    template: TemplateFn | string = `${__dirname}/template`;

    @Arg('Current working directory')
    cwd: string = process.cwd();

    @Arg('Convention for converting')
    localsConvention: LocalsConvention = 'camelCase';

    @Arg("The extension for output file")
    extension: string = '.cssi.ts';
}



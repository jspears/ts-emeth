import {Arg} from "ts-arg";
import {TemplateFn} from "./watcher";

export class Options {

    @Arg('Watch the path for changes')
    watch: boolean = false;

    @Arg('Increase verbosity')
    verbose?: boolean;

    @Arg({description: 'Path to watch', default: true, required: true})
    path: string;

    @Arg('Template function to use')
    template?: TemplateFn | string;

    @Arg('Current working directory')
    cwd?: string;

    @Arg('Convention for converting')
    localsConvention?: 'asIs' | 'camelCase' | 'camelCaseOnly';
}



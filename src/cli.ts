import {configure} from 'ts-arg';
import {Options} from './Options';
import {watcher} from './watcher';

export const runCli = (args = process.argv, opts = configure(new Options, args)) => watcher(opts).then(null, (e) => {
    console.error(e);
    process.exit(1);
});


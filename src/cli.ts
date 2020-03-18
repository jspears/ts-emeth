import {configure} from 'ts-arg';
import {Options} from './Options';
import {watcher} from './watcher';

export const runCli = (opts = configure(new Options)) => watcher(opts).then(null, (e) => {
    console.error(e);
    process.exit(1);
});


import {configure} from 'ts-arg';
import {Options} from './Options';
import {watcher} from './watcher';

watcher(configure(new Options())).then(null, (e) => {
    console.error(e);
    process.exit(1);
});

import {configure} from 'ts-arg';
import {Options} from './Options';
import {watcher} from './watcher';

watcher(configure(new Options())).then(v => process.exit(0), (e) => {
    console.error(e);
    process.exit(1);
});

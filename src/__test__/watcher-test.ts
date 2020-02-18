import {unlink} from 'fs';
import {promisify} from "util";
import {transformFile} from "../watcher";

const remove = promisify(unlink);

describe('watcher', function () {

    it('should watch and exit', async function () {

        const resp = await transformFile({path: './fixtures/*.cssm', verbose:true, cwd: __dirname});
        const r = await resp('./fixtures/test.cssm');
        if (r) {
            return remove(r);
        }else{
            throw `No file was returned`;
        }

    });
})
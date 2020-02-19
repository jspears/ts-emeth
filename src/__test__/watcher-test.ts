import {unlink} from 'fs';
import {promisify} from "util";
import {transformFile} from "../watcher";
import {expect} from 'chai';

const remove = promisify(unlink);

describe('watcher', function () {

    it('should watch and exit', async function () {

        const resp = await transformFile({path: './fixtures/*.cssm', extension:'.cssi.ts', template:'./template', verbose:true, cwd: __dirname});
        const r = await resp('./fixtures/test.cssm');
        expect(r).to.contain('fixtures/test.cssi.ts');
        if (r) {
            return remove(r);
        }else{
            throw `No file was returned`;
        }

    });
})
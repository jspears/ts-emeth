import {expect} from 'chai';
import {extract as transform} from "../extract"

const writeFile = async () => {
};

describe('extract', function () {

    it('should extract camelCaseOnly', async function () {
        const resp: string[] = [];
        let name: string;
        const extract = transform({
            cwd: './src/__test__/',
            localsConvention: 'camelCaseOnly',
            template(filename, keys) {
                name = filename;
                resp.push(...keys);
                return '';
            },
            writeFile

        });

        await extract('fixtures/test.cssm');
        expect(resp).to.eql([
            'container',
            'camelCase',
            'word',
            'nameEdit']);
    });
    it('should extract camelCase', async function () {
        let file, resp;
        const extract = transform({
            localsConvention: 'camelCase',
            writeFile,
            cwd: './src/__test__/',
            extension:'.cssi.ts',
            template(filename, keys) {
                file = filename;
                resp = keys;
                return '';
            }
        });

        await extract('fixtures/test.cssm');
        expect(resp).to.eql([
            'container',
            'camel-case',
            'camelCase',
            'word',
            'nameEdit']);

        expect(file).to.match(/fixtures\/test\.cssi\.ts/);
    });


});
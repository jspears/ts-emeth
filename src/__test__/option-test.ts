import {expect} from 'chai';
import {configure} from 'ts-arg';
import {Options} from '../Options';

describe('Options', function () {
    it('should be valid', function () {

        const opt = configure(new Options(), ['', '', '--path', 'stuff', '-t', 'template', '-c', 'cwd']);
        expect(JSON.parse(JSON.stringify(opt))).to.eql({
                "persistent": false,
                "template": "template",
                "cwd": "cwd",
                "localsConvention": "camelCase",
                "extension": ".cssi.ts",
                "path": [
                    "stuff"
                ]
            }
        );

    })
});
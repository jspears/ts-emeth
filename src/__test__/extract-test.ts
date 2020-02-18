import {expect} from 'chai';
import {transform} from "../extract";

describe('extract', function () {

    it('should extract camelCaseOnly', async function () {
        const extract = transform({context: './src/__test__/'}, {localsConvention: 'camelCaseOnly'});

        const resp = await extract('fixtures/test.cssm');
        expect(resp).to.eql(['edit',
            'highlight',
            'container',
            'camelCase',
            'word',
            'nameEdit']);
    });
    it('should extract camelCase', async function () {
        const extract = transform({context: './src/__test__/'}, {localsConvention: 'camelCase'});

        const resp = await extract('fixtures/test.cssm');
        expect(resp).to.eql(['edit',
            'highlight',
            'container',
            'camel-case',
            'camelCase',
            'word',
            'nameEdit']);
    });
    it('should extract asIs', async function () {
        const extract = transform({context: './src/__test__/'}, {localsConvention: 'asIs'});

        const resp = await extract('fixtures/test.cssm');
        expect(resp).to.eql(['edit',
            'highlight',
            'container',
            'camel-case',
            'word',
            'nameEdit']);
    });

});
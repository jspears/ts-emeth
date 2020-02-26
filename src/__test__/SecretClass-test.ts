import {expect} from 'chai';
import {SecretClass} from "../styleFactory";

const rev = (...args: string[]) => args.map((v, i) => v + '-' + i).join(' ');

describe('SecretClass', function () {

    it('should return class names', function () {

        expect(new SecretClass(['abc', 'def']).toString()).to.eql('abc def')

    });

    it('should return class names transformed', function () {
        expect(new SecretClass(['abc', 'def'], rev).toString()).to.eql('abc-0 def-1')

    });

});
import {fileToClassName} from "../util";
import {expect} from 'chai';

describe('fileToClassName', function(){
    it('should return a classname from a generic url', function(){
        expect(fileToClassName('/absolute/Something/styles.module.css'))
            .to.eql('Something')
    });
    it('should return a classname from a non generic url', function(){
        expect(fileToClassName('/absolute/Something.module.css'))
            .to.eql('Something')
    })
    it('should return a classname from a relative url', function(){
        expect(fileToClassName('./Something.module.css'))
            .to.eql('Something')
    })
})
import theme, {settings, themeClass} from 'emeth';
import {expect}                      from 'chai';

const execLoop = c => c();
describe('theme', function () {
    it('should return in the right order', function () {
        const d  = [
            theme({A: {test: 1}}),
            theme({B: {test: 3}}),
            theme({A: {test: 2}})
        ];
        const tc = themeClass({displayName: 'A'});

        expect(tc('test')).to.eql('2 1')
        d.forEach(execLoop);
    });
    it('should return unknown class', function () {
        const d       = [
            theme({A: {test: 1}}),
            theme({B: {test: 3}}),
            theme({A: {test: 2}})
        ];
        const owarn   = settings.warn;
        const capture = [];
        settings.warn = (...args) => capture.push(args);

        const tc = themeClass({displayName: 'A'});
        expect(tc('stuff')).to.eql('stuff');
        expect(capture.length).to.eql(1);
        expect(capture[0][0]).to.eql(`could not find a className for '%s' for '%s' `);
        expect(capture[0][1]).to.eql('A');
        expect(capture[0][2]).to.eql('stuff');

        d.forEach(execLoop);
        settings.warn = owarn;
    });

});

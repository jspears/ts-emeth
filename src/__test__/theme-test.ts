import {expect} from 'chai';
import theme, {themeClass} from 'emeth';
import {styleFactory} from "../styleFactory";


describe('theme', function () {
    it('testing things', function () {
        enum testCssStyles {
            "edit" = "edit",
            "highlight" = "highlight",
            "container" = "container",
            "camel-case" = "camel-case",
            "camelCase" = "camelCase",
            "word" = "word",
            "nameEdit" = "nameEdit",
        }

        const fn = theme({
            test: Object.keys(testCssStyles).reduce((r, v) => {
                r[v] = `t-${v}`;
                return r;
            }, {})
        });


        const CssStyles = testCssStyles;

        const style = styleFactory(themeClass({displayName: "test"}), CssStyles);

        expect(style.container({className: 'abc'}, {
            word: true,
            highlight: false
        }, ['camelCase'])).to.eql('t-container abc t-word t-camelCase');


        fn();
    });
});
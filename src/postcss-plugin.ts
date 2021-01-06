import {generate} from './generate';
import {EmethTSOptions} from './types';
import postcssModules from 'postcss-modules'

export default (opts: EmethTSOptions = {}) => postcssModules({
    ...opts,
    getJSON(cssFileName, json, outputFileName) {
        generate(outputFileName, Object.keys(json), opts);
        if (opts.getJSON) {
            return opts.getJSON(cssFileName, json, outputFileName)
        }
    }
});

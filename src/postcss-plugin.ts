import {generate} from './generate';
import {EmethTSOptions} from './types';
import postcssModules from 'postcss-modules'

export default (opts: EmethTSOptions = {}) => postcssModules({
    ...opts,
    async getJSON(cssFileName, json, outputFileName) {
        await generate(outputFileName, Object.keys(json), opts);
        if (opts.getJSON) {
            return opts.getJSON(cssFileName, json, outputFileName)
        }
    }
});

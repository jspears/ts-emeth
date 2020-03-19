import {Configuration} from 'webpack';
import {EmethTSOptions} from './types';

export default function tsEmethPlugin(options: EmethTSOptions, webpack: Configuration): Configuration {

    if (!webpack.resolveLoader) {
        webpack.resolveLoader = {};
    }
    if (!webpack.resolveLoader.alias) {
        webpack.resolveLoader.alias = {};
    }
    webpack.resolveLoader.alias['css-loader'] = require.resolve('../ts-css-loader.js');

    return webpack;
}
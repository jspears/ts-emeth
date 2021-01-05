import {generate} from './generate';
import {EmethTSOptions} from './types';
import postcssModules from 'postcss-modules'
import type * as postcss from 'postcss'

const resolveMessage = (message: postcss.Message): string | undefined => {
    if (message.type === 'export' && message.value) {
        return message.value.name || message.value;
    }
    if (message.type == 'replacer') {
        return message.value && message.value.localName;
    }
};
const plugin = (opts: EmethTSOptions = {}) => ({
    postcssPlugin: 'ts-emeth',
    async OnceExit(root, result) {

        await generate(result.opts.to || result.opts.from, exports, opts);
    }
});

export default plugin;

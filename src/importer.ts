import theme from 'emeth';

type Component = Record<string, string>
type Context = ((key: string) => any) & { keys(): string[] };
type Theme = { [key: string]: Component };

function isContext(ctx: Context | Theme): ctx is Context {
    return typeof ctx === 'function' && typeof ctx.keys === 'function';
}

export const importer = (ctx: Context | Theme) => theme(isContext(ctx) ? ctx.keys().reduce((ret: Theme, key) => {
    ret[key.replace(/(?:.+?)?([^//]*)\.cssm$/, '$1')] = (ctx(key) as Component);
    return ret;
}, {}) : ctx);

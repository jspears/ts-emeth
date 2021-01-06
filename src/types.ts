export type TemplateFn = (fileName: string, keys: string[], pattern?: string | RegExp, replace?: string) => Promise<string> | string;
export type LocalsConvention = 'dashes' | 'dashesOnly' | 'camelCase' | 'camelCaseOnly';

export type EmethTSOptions = {
    localsConvention?: LocalsConvention,
    template?: TemplateFn | string,
    cwd?: string,
    extension?: string,
    writeFile?(name: string, content: string, encoding?: 'utf8'): Promise<void>
    pattern?: string | RegExp,
    replace?: string,
    getJSON?: (cssFileName: string, json: Record<string, string>, outputFileName: string) => unknown;

}

export type Run = (fileName: string) => Promise<void>;
export type Types = Record<string, ComponentTheme>;
export type ComponentTheme = Record<string, string>;
export type ThemeClazz = string | { displayName: string };

export type ThemeForClazz = (clazz: ThemeClazz) => (...args: any[]) => string;
export type TemplateFn = (fileName: string, keys: string[], pattern?:string|RegExp, replace?:string) => Promise<string> | string;

export type EmethTSOptions = {
    localsConvention?: 'camelCase' | 'camelCaseOnly' | 'asIs',
    template?: TemplateFn | string,
    cwd?: string,
    extension?: string,
    writeFile?(name: string, content: string, encoding?: 'utf8'): Promise<void>
    pattern?: string | RegExp,
    replace?: string

}

export type Run = (fileName: string) => Promise<void>;

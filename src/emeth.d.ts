type DisplayName = string | {
    displayName?: string
}

export type Classenames = (...args: (string | string)[]) => string;

export type Emeth = (config: { [key: string]: { [key: string]: string } }) => () => void;

declare module 'emeth' {
    export function themeClass(clazz: DisplayName): Classenames;

    export = Emeth;
}
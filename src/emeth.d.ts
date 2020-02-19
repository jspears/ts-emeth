declare module 'emeth' {
    export type DisplayName = string | {
        displayName?: string
    }

    export type Classenames = (...args: string[]) => string;

    export function themeClass(clazz: DisplayName): Classenames;

    export default function (e: Record<string, Record<string, string>>): () => void;
}
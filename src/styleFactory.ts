import {Classenames} from "emeth";

const {defineProperty, keys, assign} = Object;
export type Keyable = string | number | symbol;


export type TCArg<T extends Keyable> = T
    | T[]
    | { [P in T]?: boolean | null | undefined | any }
    | TCArg<T>[]
    | SecretClass<any>

const recurseNormal = function <T extends Keyable>(all: Set<string>, args: TCArg<T>[]) {
    if (args.length === 0) {
        return all;
    }
    const arg = args[0];
    if (arg != null) {
        if (Array.isArray(arg)) {
            recurseNormal(all, arg);
        } else if (arg instanceof SecretClass) {
            arg.normalize.forEach(all.add, all);
        } else {
            switch (typeof arg) {
                case "bigint":
                case "number":
                case "boolean":
                case "symbol":
                case "undefined":
                case "function":
                    break;
                case "object":
                    Object.entries(arg).map(([key, value]) => value && all.add(key));
                    break;
                case "string":
                    arg.split(/ +?/).filter(Boolean).forEach(all.add, all);
                    break;
            }
        }
    }

    recurseNormal(all, args.slice(1));
    return all;
};

const DEFAULT_TC: Classenames = (args) => Array.isArray(args) ? args.filter(Boolean).join(' ') : args;

//This is how we will make adopt and friends work.
export class SecretClass<K extends Keyable> {

    constructor(private args: TCArg<K>[], private readonly theme: Classenames = DEFAULT_TC, public normalize: Set<string> = new Set()) {
        recurseNormal(this.normalize, args);
    }

    toString() {
        return this.theme(...Array.from(this.normalize));
    }
}


export interface ThemeObj {
    [key: string]: string
}

type HasClassName = {
    className?: string;
}

type ThemeFn<T extends Keyable, R> = ((...classes: TCArg<T>[]) => R);

type ThemeRecord<K extends Keyable, V> = Record<K, V>;

type KeyedThemeFn<T extends Keyable, R> = ThemeFn<T, R> & ThemeRecord<T, R>

type StyleRet<K extends Keyable> = KeyedThemeFn<K, string> & {
    container(props: HasClassName | string): string,
}

export const styleFactory = <StyleT extends ThemeObj, StyleTK extends keyof StyleT>(tc, compTheme: StyleT):
    StyleRet<StyleTK> => assign(((...classes: TCArg<StyleTK>[]) => new SecretClass(classes, tc).toString()), keys(compTheme).reduce((r, k) => {
    Object.defineProperty(r, k, {
        enumerable: true,
        get() {
            return tc(k);
        }
    });
    return r;
}, {} as ThemeRecord<StyleTK, string>), {
    container(props) {
        return tc('container', typeof props === 'string' ? adopt(props) : props && props.className ? adopt(props.className) : '');
    }
});


export const adopt: ThemeFn<string, SecretClass<string>> = (...classes) => new SecretClass<string>(classes);


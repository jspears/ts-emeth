import {Classenames} from "./emeth";

export type Keyable = string | number | symbol;


export type TCArg<T extends Keyable> = T
    | T[]
    | { [P in T]?: boolean | null | undefined | void | number | string | SecretClass<any> }
    | TCArg<T>[]
    | SecretClass<any>;

export interface ThemeObj {
    [key: string]: string
}

export type HasClassName = {
    className?: string;
}

export type ThemeFn<T extends Keyable, R> = ((...classes: TCArg<T>[]) => R);

export type ThemeRecord<K extends Keyable, V> = Record<K, V>;

export type KeyedThemeFn<T extends Keyable, R> = ThemeFn<T, R> & ThemeRecord<T, R>

export type HasContainer<K extends Keyable, R> = {
    container(props: HasClassName, ...args: TCArg<K>[]): R
};

export type StyleRet<K extends Keyable> = KeyedThemeFn<K, string> & HasContainer<K, string>
function forEach$recurse(v){
    recurseNormal(this, [v]);
}
const recurseNormal = function <T extends Keyable>(all: Set<string>, args: TCArg<T>[]) {
    const arg = args[0];
    if (arg != null) {
        if (Array.isArray(arg)) {
            arg.forEach(forEach$recurse, all);
        } else if (arg instanceof SecretClass) {
            arg.normalize.forEach(forEach$recurse, all);
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
                    all.add(arg);
                    break;
            }
        }
    }

    if (args.length > 1) {
        recurseNormal(all, args.slice(1));
    }
    return all;
};

const DEFAULT_TC: Classenames = (...args) => args.filter(Boolean).join(' ')

//This is how we will make adopt and friends work.
export class SecretClass<K extends Keyable> {

    constructor(private args: TCArg<K>[], private readonly theme: Classenames = DEFAULT_TC, public normalize: Set<string> = new Set()) {
        recurseNormal(this.normalize, args);
    }

    toString() {
        return this.theme(...Array.from(this.normalize));
    }
}


export const styleFactory = <StyleT extends ThemeObj, StyleTK extends keyof StyleT>(tc, compTheme: StyleT): StyleRet<StyleTK> =>
    Object.assign(((...classes) => new SecretClass(classes, tc).toString()), Object.keys(compTheme).reduce((r, k) => {
        Object.defineProperty(r, k, {
            enumerable: true,
            get() {
                return tc(k);
            }
        });
        return r;
    }, {} as ThemeRecord<StyleTK, string>), {
        container(props, ...rest) {
            return new SecretClass(['container', props.className && adopt(props.className), ...rest], tc).toString();
        }
    });


export const adopt: ThemeFn<string, SecretClass<string>> = (...classes) => new SecretClass<string>(classes);


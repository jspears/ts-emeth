import {fileToClassName} from "./util";

export const template = (filePath, keys) => {
    const clazz = fileToClassName(filePath);
    return `import { styleFactory} from "ts-emeth";
    
export {adopt} from "ts-emeth";

export enum ${clazz}CssStyles {
   ${keys.map(line => `    ${JSON.stringify(line)} = ${JSON.stringify(line)}`).join(`,\n`)},
}

export const CssStyles = ${clazz}CssStyles;

export default styleFactory(themeClass({displayName: "${clazz}"}, CssStyles), CssStyles);

`;
}

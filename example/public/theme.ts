import {importer} from "ts-emeth";

export default importer(require.context('.', true, /\.cssm$/));
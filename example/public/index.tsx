import * as React from 'react';
import './theme';
import {importer} from "ts-emeth";
import Comp from './Comp';
import Other from './Other.cssi'
importer(require.context('.', true, /\.cssm$/));


const Example: React.FC<{}> = (props) => {
    console.log(Other.header, Other);

    return <div>
        <Comp className={Other.header}/>
    </div>
};


export default Example;

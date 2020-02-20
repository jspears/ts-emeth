import * as React from 'react';
import {importer} from "ts-emeth";
import Comp from './Comp';
import tc from './Other.cssi'
import './theme';

importer(require.context('.', true, /\.cssm$/));

type Props = {
    className?: string,
    isMore?: boolean
}
const Example: React.FC<Props> = (props) => {
    return <div className={tc.container(props, 'header', {more: props.isMore})}>
        <Comp className={tc.comp}/>
    </div>
};


export default Example;

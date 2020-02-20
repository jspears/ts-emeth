import * as React from 'react';
import tc from './Comp.cssi';

export type CompProps = {
    className?: string,
}
const Comp: React.FC<CompProps> = (props) => (<div className={tc.container(props, 'border')}>
    <span className={tc('hello')}>hello</span>
    {props.children}
</div>);

export default Comp;
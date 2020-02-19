import * as React from 'react';
import Style from './Comp.cssi';

export type CompProps = {
    className?: string,
}
const Comp: React.FC<CompProps> = (props) => (<div className={Style.container(props)}>
    <span>hello</span>
    {props.children}
</div>);

export default Comp;
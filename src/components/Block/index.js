import React from 'react';
import Header from '../Header';

import stl from './Block.module.scss';

function Block(props) {
    return (
        <section className={stl.root}>
            <Header >{props.header || " OOOOOPS !!!"}</Header>
            <div className={stl.content}>
                {props.children}
            </div>
        </section>
    );
}

export default Block;
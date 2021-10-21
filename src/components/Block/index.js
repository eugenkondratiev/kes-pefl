import React, { useCallback, useState } from 'react';
import Header from '../Header';

import stl from './Block.module.scss';
import cn from 'classnames';

function Block({ header, collapsed, children, ...props }) {
    const toggleCollapsed = useCallback(
        () => {
            setisCollapsed(prevCollapsed => !prevCollapsed)
        }
        , [])

    const [isCollapsed, setisCollapsed] = useState(collapsed)

    return (
        <section className={cn({ [stl.root]: true, [stl['collapsed-content']]: isCollapsed })}>
            {/* <section className={stl.root}> */}
            <Header

                clickHeader={toggleCollapsed}
            >{header || " OOOOOPS !!!"}</Header>
            <div className={stl.content}>
                {children}
            </div>
        </section>
    );
}

export default Block;
import React, { useCallback, useEffect, useState } from 'react';
import Header from '../Header';

import stl from './Block.module.scss';
import cn from 'classnames';
import useDebounce from '../../hooks/useDebounce';

function Block({ header, collapsed, children, onInflate, ...props }) {
    const toggleCollapsed = useCallback(
        () => {
            setisCollapsed(prevCollapsed => {

                return !prevCollapsed
            });
        }
        , [])

    const [isCollapsed, setisCollapsed] = useState(collapsed)

    useDebounce(() => {
        !isCollapsed && typeof onInflate === 'function' && onInflate()
    }, 300, [isCollapsed])

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
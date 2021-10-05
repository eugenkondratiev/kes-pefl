import React from 'react';
import stl from './Header.module.scss';
function Header(props) {
    return (
        <header className={stl.root}>
            {props.children || " - "}
        </header>
    );
}

export default Header;
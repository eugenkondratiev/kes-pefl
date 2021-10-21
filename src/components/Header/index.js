import React from 'react';
import stl from './Header.module.scss';
function Header({clickHeader, ...props}) {
    return (
        <header 
        title="Скрыть/показать содержание" 
        className={stl.root}
        onClick={()=>{clickHeader()}}
        >
            {props.children || " - "}
        </header>
    );
}

export default Header;
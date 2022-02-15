import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import stl from './StyledButton.module.scss';

function StyledButton(_props) {
    const { shape, size, onClick, icon, title, ...props } = _props;
    const refButton = useRef(null)

    useEffect(() => {
        const ref = refButton.current;
        ref.addEventListener('click', onClick)
        return () => { ref.removeEventListener('click', onClick) }
    }, [onClick])

    return (
        <Button
            ref={refButton}
            className={stl.root}
            shape={shape}
            size={size}
            // onClick={onClick}
            icon={icon}
            title={title}
        >
            {props.children}
        </Button>
    );
}

export default StyledButton;
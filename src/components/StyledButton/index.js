import React from 'react';
import { Button } from 'antd';
import stl from './StyledButton.module.scss';

function StyledButton(_props) {
    const { shape, size, onClick, ...props } = _props;

    return (
        <Button
            shape={shape}
            size={size}
            className={stl.mainButton}
            onClick = {onClick}
        >
            {props.children}
        </Button>
    );
}

export default StyledButton;
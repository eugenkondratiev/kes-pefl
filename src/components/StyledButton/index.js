import React from 'react';
import { Button } from 'antd';
import './StyledButton.scss';

function StyledButton(_props) {
    const { shape, size, onClick, ...props } = _props;

    return (
        <Button 
        className="styled-button"
            shape={shape}
            size={size}
            onClick = {onClick}
        >
            {props.children}
        </Button>
    );
}

export default StyledButton;
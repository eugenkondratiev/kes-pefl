import React from 'react';
import { Button } from 'antd';
import './StyledButton.scss';

function StyledButton(_props) {
    const { shape, size, onClick, icon,title, ...props } = _props;

    return (
        <Button
            className="styled-button"
            shape={shape}
            size={size}
            onClick={onClick}
            icon={icon}
            title={title}
        >
            {props.children}
        </Button>
    );
}

export default StyledButton;
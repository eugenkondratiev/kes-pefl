import React from 'react';

function AntdIcon({node,...rest}) {
    const Node = node;

    return (
        <span role="img" aria-label="user" className="anticon anticon-user">
            <Node 
            viewBox="20 20 388 411" 
            focusable="false" 
            className="" 
            data-icon="user" 
            width="1em" height="1em" 
            fill="currentColor" 
            aria-hidden="true"
            {...rest}
            />
        </span>
    );
}

export default AntdIcon;
import React from 'react';

function AntdIcon({node,viewbox, ...rest}) {
    const Node = node;

    return (
        <span role="img" aria-label="user" className="anticon anticon-user">
            <Node 
            viewBox={ viewbox || "50 0 400 480"} 
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
import { Spin } from 'antd';
import React from 'react';
import Block from '../Block';

function Group({ groupData, ...restProps }) {
    if (!groupData) return <Spin />

    return (
        <Block header={groupData.name}>
            <h4>
                {groupData._id}
            </h4>
            <h3>
                {JSON.stringify(groupData)}
            </h3>
            <h3>
                {JSON.stringify(groupData.pl && groupData.pl.split('|'))}
            </h3>

        </Block>
    );
}

export default Group;
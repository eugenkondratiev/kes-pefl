import { getTitle } from 'hookrouter';
import React from 'react';
import { SvgCopyIcon } from '../../assets/svg/icons';
import StyledButton from '../StyledButton';
import stl from './Copy2Clipboard.module.scss';

function Copy2Clipboard({ copytext}) {
    if (!navigator || !navigator.clipboard.writeText) return null

    return (
        <StyledButton
            className={stl.root}
            onClick={
                () => {
                    console.log(getTitle())
                    navigator.clipboard.writeText(copytext)
                }
            }
            size='middle'
            shape='circle'
            icon={<SvgCopyIcon />}
            title='Скопировать cсылку с буфер обмена'
        >
        </StyledButton>
    );
}

export default Copy2Clipboard
// import { getTitle } from 'hookrouter';
import React from 'react';
import { SvgCopyIcon } from '../../assets/svg/icons';
import StyledButton from '../StyledButton';
import './Copy2Clipboard.css';

function Copy2Clipboard({ copytext, _title = 'Скопировать cсылку с буфер обмена' }) {
    if (!navigator || !navigator.clipboard.writeText) return null

    return (
        <StyledButton
            onClick={
                () => {
                    // console.log(getTitle())
                    navigator.clipboard.writeText(copytext)
                }
            }
            size='middle'
            shape='circle'
            icon={<SvgCopyIcon />}
            title={_title}
        >
        </StyledButton>
    );
}

export default Copy2Clipboard
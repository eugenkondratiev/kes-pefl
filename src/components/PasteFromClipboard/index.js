import React from 'react';
import { SvgPasteIcon } from '../../assets/svg/icons';
import StyledButton from '../StyledButton';
import './PasteFromClipboard.css';

function PasteFromClipboard({ cb, _title = 'Вставить данные из буфера обмена' }) {
    if (!navigator || !navigator.clipboard.readText) return null

    return (
        <StyledButton
            // style={{ padding: "7px" }}
            onClick={
                () => {
                    // console.log(getTitle())
                    navigator.clipboard.readText().then(
                        cliptext => cb(cliptext)
                    ).catch(e => {
                        console.log("####readText error -", e);
                    })
                }
            }
            size='middle'
            shape='circle'
            icon={<SvgPasteIcon />}
            title={_title}
        >
        </StyledButton>
    );
}

export default PasteFromClipboard
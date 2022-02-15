// import { getTitle } from 'hookrouter';
import React, { useState } from 'react';
import { SvgCopyIcon } from '../../assets/svg/icons';
import StyledButton from '../StyledButton';
import './Copy2Clipboard.css';
import cn from 'classnames';
import useTimeout from '../../hooks/useTimeout';
const [IDLE, SUCCESSFUL, FAILED] = [0, 1, 2]
const HIDE_ACTION_LABEL_DELAY = 1500

function Copy2Clipboard({ copytext, _title = 'Скопировать cсылку с буфер обмена' }) {
    const [resultState, setResultState] = useState(IDLE);

    const { reset: resetHidingTimer } = useTimeout(() => {
        setResultState(IDLE);;
    }, HIDE_ACTION_LABEL_DELAY)

    if (!navigator || !navigator.clipboard.writeText) return null



    return (
        <StyledButton
            onClick={
                () => {
                    // console.log(getTitle())
                    navigator.clipboard.writeText(copytext)
                        .then(rlt => {
                            setResultState(SUCCESSFUL);
                            resetHidingTimer()
                        }).catch(e => {
                            setResultState(FAILED);
                            resetHidingTimer()
                        })
                }
            }
            size='middle'
            shape='circle'
            icon={<SvgCopyIcon />}
            title={_title}
        >
            <div className={
                cn(
                    "action-result-tooltip",
                    {
                        'action-result-visible': resultState !== IDLE,
                        'action-result-failed': resultState === FAILED,
                    }
                )}>
                {
                    resultState === FAILED
                        ? <><p>Ошибка копирования </p><p>в буфер обмена</p></>
                        : <><p>Успешно cкопировано </p><p>в буфер обмена</p></>
                }
            </div>
        </StyledButton>

    );
}

export default Copy2Clipboard
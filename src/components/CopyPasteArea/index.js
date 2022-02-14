import React, { useRef, useState, useEffect } from 'react';
import stl from './CopyPasteArea.module.scss';
import Copy2Clipboard from '../Copy2Clipboard';
import PasteFromClipboard from '../PasteFromClipboard';

import FitToContent from './text-area-fit-2content';
import useDebounce from '../../hooks/useDebounce';

function CopyPasteArea({
    readonly = false, iscopy = true, ispaste = false,
    back = "#f0f2f5",
    onDataChange,
    ...props
}) {


    const rowDataRef = useRef(null)
    // const rowDataPastedFromClipboardRef = useRef(false)

    const [rowValue, setRowValue] = useState("")

    useDebounce(() => {
        typeof onDataChange === 'function' && onDataChange(rowValue) 
        FitToContent(rowDataRef.current, 1024)
            ;
    }, 1000, [rowValue])

    return (
        <div className={stl["area-wrapper"]}>

            <textarea
                className={stl["main-text-area"]}
                ref={rowDataRef} value={rowValue}
                readOnly={readonly}
                style={{
                    width: "40rem",
                    minHeight: "10rem",
                    backgroundColor: readonly ? "#e5e5e5" : back
                }}
                onChange={
                    (e) => {
                        // console.log("textarea changed");
                        setRowValue(e.target.value)
                    }
                }
            >
            </textarea>
            <div className={stl['controls-wrapper']}>
                {ispaste && <PasteFromClipboard
                    className="p7modify"
                    cb={
                        (text) => {
                            // console.log("text to paste");
                            setRowValue(text)
                        }
                    }
                />}
                {iscopy && <Copy2Clipboard
                    className="p7modify"
                    _title="Скопировать данные в буфер обмена"
                    copytext={rowDataRef && rowDataRef.current && rowDataRef.current.value}
                />}
            </div>
        </div>
    );
}

export default CopyPasteArea;
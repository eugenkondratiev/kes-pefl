import React, { useRef, useState, useEffect } from 'react';
import stl from './CopyPasteArea.module.scss';
import Copy2Clipboard from '../Copy2Clipboard';
import PasteFromClipboard from '../PasteFromClipboard';

import FitToContent from './text-area-fit-2content';
import useDebounce from '../../hooks/useDebounce';

function CopyPasteArea({
    readonly = false, iscopy = true, ispaste = false, resize = false,
    back = "#f0f2f5",
    onDataChange,
    data = "",
    ...props
}) {


    const rowDataRef = useRef(null)
    const [rowValue, setRowValue] = useState(data)

    useDebounce(() => {
        resize && FitToContent(rowDataRef.current, 1024)
        typeof onDataChange === 'function' && onDataChange(rowValue)
    }, 1000, [rowValue])

    useDebounce(() => {
        resize && FitToContent(rowDataRef.current, 1024)
    }, 2000, [data])


    useEffect(() => {
        setRowValue(data)
    }, [data])

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
                            setRowValue(text)
                        }
                    }
                />}
                {iscopy && <Copy2Clipboard
                    className="p7modify"
                    _title="Скопировать данные в буфер обмена"
                    copytext={data}
                />}
            </div>
        </div>
    );
}

export default CopyPasteArea;
import React, { useEffect, useRef, useState } from 'react';
import Block from '../../components/Block';
import Copy2Clipboard from '../../components/Copy2Clipboard';
import CopyPasteArea from '../../components/CopyPasteArea';
import PasteFromClipboard from '../../components/PasteFromClipboard';
import StyledButton from '../../components/StyledButton';
import LayerPage from '../LayerPage';
import stl from "./TablesMasterPage.module.scss"

function TablesMasterPage(props) {

    // const rowDataRef = useRef(null)
    // const rowDataPastedFromClipboardRef = useRef(false)

    // const [rowValue, setRowValue] = useState("")
    // useEffect(() => {
    //     console.log("rowValue chanched do smth");;
    // }, [rowValue])

    function onChangeRowData(text) {
        console.log("rowValue changed to ", text);;

    }
    return (
        <LayerPage mainCaption="Мастер создания таблиц для pefl">

            <Block
                header="Исходные данные">
                <CopyPasteArea
                    // iscopy={false} 
                    ispaste
                    onDataChange={onChangeRowData}
                />
            </Block>

            <Block
                header="Результат">
                <CopyPasteArea readonly />
            </Block>

        </LayerPage>
    );
}

export default TablesMasterPage;
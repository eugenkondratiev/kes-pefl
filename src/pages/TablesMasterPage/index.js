import React, { useEffect, useRef, useState } from 'react';
import Block from '../../components/Block';
import CopyPasteArea from '../../components/CopyPasteArea';
// import StyledButton from '../../components/StyledButton';
import LayerPage from '../LayerPage';
import stl from "./TablesMasterPage.module.scss"

function TablesMasterPage(props) {

    // const rowDataRef = useRef(null)
    // const rowDataPastedFromClipboardRef = useRef(false)

    const [rowData, setRowData] = useState("")
    const [peflTable, setPeflTable] = useState("");

    useEffect(() => {
        console.log("rowValue changed to ", rowData);;
        rowData && setPeflTable("OLOLOLOLO!!!! " + rowData)
    }, [rowData])

    function onChangeRowData(text) {
        // console.log("rowValue changed to ", text);;
        setRowData(text)
    }
    return (
        <LayerPage mainCaption="Мастер создания таблиц для pefl">

            <Block
                header="Исходные данные">
                <CopyPasteArea
                    // iscopy={false} 
                    data={rowData}
                    ispaste
                    onDataChange={onChangeRowData}
                />
            </Block>

            { peflTable && <Block
                header="Результат">
                <CopyPasteArea 
                readonly 
                resize
                data={peflTable}
                />
            </Block>
            }

        </LayerPage>
    );
}

export default TablesMasterPage;
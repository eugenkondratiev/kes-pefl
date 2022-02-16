import React, { useEffect, useState } from 'react';
import Block from '../../components/Block';
import CopyPasteArea from '../../components/CopyPasteArea';
import StyledButton from '../../components/StyledButton';
import useLocalStorage from '../../hooks/useLocalStorage';
// import StyledButton from '../../components/StyledButton';
import formPeflTable from '../../utils/pefl-views/form-table-in-pefl-style';
import LayerPage from '../LayerPage';
import stl from "./TablesMasterPage.module.scss"

function TablesMasterPage(props) {

    // const rowDataRef = useRef(null)
    // const rowDataPastedFromClipboardRef = useRef(false)

    const [rowData, setRowData] = useState("")
    const [peflTable, setPeflTable] = useState("");
    const [maincolor, setMaincolor] = useLocalStorage("reflmaincolor", "#c9f8b7");

    useEffect(() => {
        // console.log("rowValue changed to ", rowData);;
        ;
        // rowData && form contro;s according to table columns

    }, [rowData])

    function onChangeRowData(text) {
        // console.log("rowValue changed to ", text);;
        setRowData(text)


    }

    function showPeflStyledTable() {
        rowData && setPeflTable([""])
        setTimeout(() => { rowData && setPeflTable(formPeflTable(rowData)) }, 50)
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
            <form className={stl.controlForm}>
                <div>
                    {maincolor}
                    <input
                        type='color' name='colorpicker'
                        value={maincolor}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setMaincolor(e.target.value)
                        }}
                    />
                </div>
                <StyledButton
                    onClick={showPeflStyledTable}
                >
                    Получить таблицу
                </StyledButton>
                <StyledButton>OLOLO</StyledButton>
            </form>
            {peflTable && <Block
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
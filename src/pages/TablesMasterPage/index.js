import React, { useEffect, useState } from 'react';
import Block from '../../components/Block';
import CopyPasteArea from '../../components/CopyPasteArea';
import MultiPageControls from '../../components/MultiPageControls';
import StyledButton from '../../components/StyledButton';
// import useLocalStorage from '../../hooks/useLocalStorage';
// import StyledButton from '../../components/StyledButton';
import formPeflTable from '../../utils/pefl-views/form-table-in-pefl-style';
import LayerPage from '../LayerPage';
import stl from "./TablesMasterPage.module.scss"

function TablesMasterPage(props) {

    // const rowDataRef = useRef(null)
    // const rowDataPastedFromClipboardRef = useRef(false)

    const [rowData, setRowData] = useState("")
    const [peflTable, setPeflTable] = useState("");

    // const [maincolor, setMaincolor] = useLocalStorage("reflmaincolor", "#c9f8b7");

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
                <label for="mainDataArea">Вставьте скопированную из Excel таблицу &#8595;</label>
                <CopyPasteArea
                    name="rawDataArea"
                    // iscopy={false} 
                    data={rowData}
                    ispaste
                    onDataChange={onChangeRowData}
                />
            </Block>
            <Block header="Настройки" collapsed>

                <form className={stl.controlForm}>
                    {/* <div>
                        {maincolor}
                        <input
                            type='color' name='colorpicker'
                            value={maincolor}
                            onChange={(e) => {
                                // console.log(e.target.value);
                                setMaincolor(e.target.value)
                            }}
                        />
                    </div> */}
                    <MultiPageControls />
                </form>
            </Block>
            <StyledButton
                onClick={showPeflStyledTable}
            >
                Получить таблицу
            </StyledButton>
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
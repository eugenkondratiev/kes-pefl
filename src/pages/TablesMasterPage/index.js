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

    return (
        <LayerPage mainCaption="Мастер создания таблиц для pefl">
            <Block header="Ждем не торопим ©">
                <p>
                    Создание таблиц со специфичными для pefl тегами
                </p>
                <p>
                    Раздел в разработке
                </p>
                <p>
                    Пока вы можете использовать пробный функционал из песочницы
                </p>
                <StyledButton
                    shape="rounded"
                    title="Перейти к песочнице"
                >
                    <a target='blank' href='https://eugenkondratiev.github.io/sandbox/pefltables'>Перейти</a>
                </StyledButton>
            </Block>
            <Block
                header="Исходные данные">
                <CopyPasteArea />
            </Block>

            <Block
                header="Результат">
                <CopyPasteArea readonly back="#e5e5e5"/>
            </Block>

        </LayerPage>
    );
}

export default TablesMasterPage;
import React, { useEffect, useRef, useState } from 'react';
import Block from '../../components/Block';
import Copy2Clipboard from '../../components/Copy2Clipboard';
import PasteFromClipboard from '../../components/PasteFromClipboard';
import StyledButton from '../../components/StyledButton';
import LayerPage from '../LayerPage';
import stl from "./TablesMasterPage.scss"

function TablesMasterPage(props) {

    const rowDataRef = useRef(null)
    const rowDataPastedFromClipboardRef = useRef(false)

    const [rowValue, setRowValue] = useState("")
    useEffect(() => {
        console.log("rowValue chanched do smth");;
    }, [rowValue])

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
            <Block>
                <div className={stl["area-wrapper"]}>

                    <textarea
                        ref={rowDataRef} value={rowValue}
                        style={{ width: "30rem", minHeight: "10rem" }}
                        onChange={
                            (e) => {
                                console.log("textarea changed");
                                setRowValue(e.target.value)

                                // if (!rowDataPastedFromClipboardRef.current) {

                                // } else {
                                //     rowDataPastedFromClipboardRef.current = false
                                // }
                            }
                        }
                    >
                    </textarea>
                    <div className={stl['controls-wrapper']}>
                        <PasteFromClipboard
                            className="p7modify"
                            cb={
                                (text) => {
                                    console.log("text to paste");
                                    // rowDataRef.current.value = 
                                    setRowValue(text)
                                    //TODO useDebounce
                                }
                            }
                        />
                        <Copy2Clipboard
                            className="p7modify"
                            copytext={rowDataRef && rowDataRef.current && rowDataRef.current.value}
                        />
                    </div>
                </div>
            </Block>
        </LayerPage>
    );
}

export default TablesMasterPage;
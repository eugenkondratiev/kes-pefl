import React from 'react';
import Block from '../../components/Block';
import StyledButton from '../../components/StyledButton';
import LayerPage from '../LayerPage';

function TablesMasterPage(props) {
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
        </LayerPage>
    );
}

export default TablesMasterPage;
import React from 'react';
import Block from '../../components/Block';
import StyledButton from '../../components/StyledButton';
import LayerPage from '../LayerPage';

function FixturesPage(props) {
    return (
        <LayerPage mainCaption="Мастер создания Fixtures">
            <Block header="Ждем не торопим ©">
            <p>
                    Создание данных для внесения в fixtures и календаря для группового турнира по таблице из excel 
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
                    <a target='blank' href='https://eugenkondratiev.github.io/sandbox/draws'>Перейти</a>
                </StyledButton>
            </Block>
        </LayerPage>
    );
}

export default FixturesPage;
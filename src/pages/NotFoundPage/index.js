import { navigate } from 'hookrouter';
import React from 'react';
import StyledButton from '../../components/StyledButton';
import stl from './NotFoundPage.module.scss';
import { LinkEnum } from '../../routes';
import Block from '../../components/Block';

const NotFoundPage = () => {
    return (
        <div className={stl.root}>
            <Block
                label="OOOPS!"
            >

                Такая страница не найдена!
                <StyledButton
                    className='main-button'
                    size='large'
                    shape='round'
                    onClick={() => { navigate(LinkEnum.HOME) }}
                >
                    к домашней странице
                </StyledButton>
            </Block>

        </div>
    )
}

export default NotFoundPage
import React from 'react';
import { SvgPlayerIcon, SvgIntercupsIcon, SvgCupsIcon } from '../../assets/svg/icons';
import LayerPage from '../LayerPage';

function HomePage(props) {
    return (
        <LayerPage mainCaption="Добро пожаловать">
         
            Тут будет что-то , но не сейчас

            <SvgPlayerIcon height="1em" width="1em"/>
            <SvgCupsIcon height="1em" width="1em"/>
            <SvgIntercupsIcon height="1em" width="1em"/>

        </LayerPage>
    );
}

export default HomePage;
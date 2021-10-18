import { Spin } from 'antd';
import React, { useContext } from 'react';
import Block from '../../components/Block';
import { CupsContext } from '../../context/cups-context';
import LayerPage from '../LayerPage';

function CupsPage(props) {

    const cupsContext = useContext(CupsContext);

    return (
        <LayerPage mainCaption="История кубков">
            <Block header="">
                Раздел в разработке
                {cupsContext.loading && <Spin/>}

                {String(cupsContext.loading)}
                {!cupsContext.loading && cupsContext.cups && <div>



                    <span>{JSON.stringify(cupsContext.getFfCupData(93, 'cup'))}</span>
                    <span>{JSON.stringify(cupsContext.getFfCupData(93, 'supercup'))}</span>
                    <span>{JSON.stringify(cupsContext.getFfCupData(172, 'extracup'))}</span>
                </div>
                }

            </Block>
        </LayerPage>
    );
}

export default CupsPage;
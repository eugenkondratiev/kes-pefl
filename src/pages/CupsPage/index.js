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



                    <div>{JSON.stringify(cupsContext.getFfCupData(93, 'cup'))}</div>
                    <div>{JSON.stringify(cupsContext.getFfCupData(93, 'supercup'))}</div>
                    <div>{JSON.stringify(cupsContext.getFfCupData(172, 'extracup'))}</div>
                    <div>{JSON.stringify(cupsContext.getIntercupData(231))}</div>
                </div>
                }

            </Block>
        </LayerPage>
    );
}

export default CupsPage;
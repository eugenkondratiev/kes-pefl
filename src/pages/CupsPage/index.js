
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Block from '../../components/Block';
import Cup from '../../components/Cup';
import { CupsContext } from '../../context/cups-context';
import LayerPage from '../LayerPage';
import testCupIreland from '../../assets/tests/cup_93_19';
// import { NationsContext } from '../../context/nation-context';
import CupsSelector from '../../components/CupSelector';
// import Game from '../../components/Game';
import CupRound from '../../components/CupRound';
// import { ClubsContext } from '../../context/clubs-context';
import { getFlagById } from '../../utils/pefl-stings';


function CupsPage(props) {

    // const { loading: cupsLoading, cups, getFfCupData, getCups, getFfCups } = useContext(CupsContext);
    // const { loading: cupsLoading, cups } = useContext(CupsContext);
    const cupsContext = useContext(CupsContext);
    const { loading: cupsLoading, cups, getFfCups, getFfCupData } = cupsContext;

    // const { loading: nationsLoading, getNation, nations } = useContext(NationsContext);

    // const { loading: clubsLoading, clubs } = useContext(ClubsContext)



    // const idRef = useRef();

    const [cupID, setCupID] = useState();

    const sortedRounds = useCallback(_ => {
        const sorted = [..._].reverse()
        console.log("sorted  - ", sorted);
        return sorted
    }, [])

    const updateCupId = (_id) => {

        setCupID(_id)
        console.log("updateCupId - ", _id);
    }



    console.log("#### cupPage rendered !!!");

    return (
        <LayerPage mainCaption="История кубков">
            <h3 style={{ textAlign: 'center', width: "100%", justifyContent: "center" }}>{cupID && cupID}</h3>

            <CupsSelector onUpdateId={updateCupId} />

            <Cup _cupId={cupID} />
            <div>
                <div >

                    <h3>{testCupIreland.name}</h3>
                    <h4>{`Сезон ${testCupIreland.season}`}</h4>
                    Раздел в разработке.
                    Пока тесты на ирландcком кубке
                </div>
                <img alt="flag" style={{ float: "right" }} src={getFlagById(93)} />
            </div>

            <Block header={testCupIreland._id}>
                {/* {JSON.stringify(testCupIreland, null, " ")} */}
                {testCupIreland.name}
                {testCupIreland.season}
                <img alt="flag" style={{ float: "right" }} src={getFlagById(93)} />
                Раздел в разработке.
                Пока тесты на ирландcком кубке

            </Block>

            {sortedRounds(testCupIreland.rounds).map((round, index) => {
                return <CupRound key={index} round={round} />
            })}
            {/* <Block header="">
                Раздел в разработке
                {cupsContext.loading && <Spin />}

                {String(cupsContext.loading)}
                {!cupsContext.loading && cupsContext.cups && <div>



                    <div>{JSON.stringify(cupsContext.getFfCupData(93, 'cup'))}</div>
                    <div>{JSON.stringify(cupsContext.getFfCupData(93, 'supercup'))}</div>
                    <div>{JSON.stringify(cupsContext.getFfCupData(172, 'extracup'))}</div>
                    <div>{JSON.stringify(cupsContext.getIntercupData(231))}</div>

                </div>
                }

            </Block> */}
        </LayerPage>
    );
}

export default CupsPage;
import React, { useContext, useState } from 'react';
import Block from '../../components/Block';
import LayerPage from '../LayerPage';

// import Block from '../../components/Block';
import Cup from '../../components/Cup';
import { CupsContext } from '../../context/cups-context';
// import testCupIreland from '../../assets/tests/cup_93_19';
// import { NationsContext } from '../../context/nation-context';
import CupsSelector from '../../components/CupSelector';
import InterCup from '../../components/InterCup';
import IntercupsSelector from '../../components/IntercupSelector';
// import Game from '../../components/Game';
// import CupRound from '../../components/CupRound';
// import { ClubsContext } from '../../context/clubs-context';
// import { getFlagById } from '../../utils/pefl-stings';

function InterCupsPage(props) {

    // const { loading: cupsLoading, cups, getFfCupData, getCups, getFfCups } = useContext(CupsContext);
    // const { loading: cupsLoading, cups } = useContext(CupsContext);
    const cupsContext = useContext(CupsContext);
    const { loading: cupsLoading, cups, getFfCups, getFfCupData } = cupsContext;

    // const { loading: nationsLoading, getNation, nations } = useContext(NationsContext);

    // const { loading: clubsLoading, clubs } = useContext(ClubsContext)



    // const idRef = useRef();

    const [cupID, setCupID] = useState();

    // const sortedRounds = useCallback(_ => {
    //     const sorted = [..._].reverse()
    //     console.log("sorted  - ", sorted);
    //     return sorted
    // }, [])

    const updateCupId = (_id) => {

        setCupID(_id)
    }


    return (
        <LayerPage mainCaption="История международных кубков">

            <Block header="Раздел в разработке">
                <div>
                    Для просмотра международных кубков
                </div>
                <div>
                    с групповым турниром используйте широкий экран
                </div>
            </Block>
            {/* <h3 style={{ textAlign: 'center', width: "100%", justifyContent: "center" }}>{cupID && cupID}</h3> */}

            <IntercupsSelector onUpdateId={updateCupId} />

            {/* <Cup _cupId={cupID} /> */}
            <InterCup _cupId={cupID} />
        </LayerPage>
    );
}

export default InterCupsPage;
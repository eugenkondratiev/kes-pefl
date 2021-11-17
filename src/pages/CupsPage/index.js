
import React, {  useContext, useState } from 'react';
// import Block from '../../components/Block';
import Cup from '../../components/Cup';
import LayerPage from '../LayerPage';
import { NationsContext } from '../../context/nation-context';
import CupsSelector from '../../components/CupSelector';
// import { ClubsContext } from '../../context/clubs-context';
// import { getFlagById } from '../../utils/pefl-stings';


function CupsPage(props) {

    // const { loading: cupsLoading, cups, getFfCupData, getCups, getFfCups } = useContext(CupsContext);
    // const { loading: cupsLoading, cups } = useContext(CupsContext);


    // const cupsContext = useContext(CupsContext);
    // const { loading: cupsLoading, cups, getFfCups, getFfCupData } = cupsContext;
    const { loading: nationsLoading, getNation, nations } = useContext(NationsContext);

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



    // console.log("#### cupPage rendered !!!");

    return (
        <LayerPage mainCaption="История кубков">
            {/* <h3 style={{ textAlign: 'center', width: "100%", justifyContent: "center" }}>{cupID && cupID}</h3> */}

            <CupsSelector onUpdateId={updateCupId} />

            <Cup _cupId={cupID} />

        </LayerPage>
    );
}

export default CupsPage;
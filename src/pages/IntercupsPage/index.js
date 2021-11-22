import React, {  useState, useEffect } from 'react';
import Block from '../../components/Block';
import LayerPage from '../LayerPage';

import InterCup from '../../components/InterCup';
import IntercupsSelector from '../../components/IntercupSelector';

function InterCupsPage({ _cupid, ...props }) {

    const [cupID, setCupID] = useState();
    const [nationFilter, setNationFilter] = useState();

    useEffect(() => {
        _cupid && setCupID(_cupid);
    }, [_cupid])

    const updateCupId = (_id) => {

        setCupID(_id)
    }
    const filterByNation = (nation) => {
        setNationFilter(nation)
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

            <IntercupsSelector
                onUpdateId={updateCupId}
                onFilteredNation={(nation) => { filterByNation(nation) }}
                initCupId={_cupid}
            />

            {/* <Cup _cupId={cupID} /> */}
            <InterCup
                _cupId={cupID}
                filterednation={nationFilter}
            />
        </LayerPage>
    );
}

export default InterCupsPage;
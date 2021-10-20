import { Spin } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useData from '../../hooks/useCupData';
import useDebounce from '../../hooks/useDebounce';
import { cupById_REF } from '../../utils/constants';
import { getFlagById } from '../../utils/pefl-stings';
import CupRound from '../CupRound';
import stl from './Cup.module.scss';

function Cup({ _cupId, children, ...restprops }) {
    // const cupIdRef = useRef()
    // const cupDataRef = useRef();

    // console.log(" -!!! Cup component rendered ", _cupId);
    const [cupID, setCupID] = useState()

    useDebounce(() => {
        setCupID(_cupId)
    }, 2000, [_cupId])

    const { cupData, isLoading, isError } = useData(cupById_REF, cupID, [cupID])

    const sortedRounds = useCallback(_ => {
        const sorted = [..._].reverse()
        // console.log("sorted  - ", sorted);
        return sorted
    }, [])

    useEffect(() => {
        console.log("useEffect cupId -  ", _cupId);
        // cupIdRef.current = _cupId;
    }, [_cupId])

    // useEffect(() => {
    //     console.log("useEffect  olollolo");
    //     cupIdRef.current = "ololo";
    // }, [])
    if (isError || isLoading) return <Spin />
    if ( !cupData || !cupID) return <h1>Выберите турнир <Spin /></h1>

    return (
        <div className={stl.root}>
            {/* <h1 style={{ textAlign: 'center', width: "100%" }}>{cupID && cupID}</h1> */}
            {/* <h2 style={{ textAlign: 'center', width:"100%" }}>{cupIdRef && cupIdRef.current}</h2> */}

            {/* { cupData && JSON.stringify(cupData, null, " ")} */}
            {/* {cupData && cupID && JSON.stringify(sortedRounds(cupData.rounds), null, " ")} */}
            {/* {cupData && cupID && JSON.stringify(cupData.rounds, null, " ")} */}
            <div className={stl.maininfo}>
                <div >

                    <h3>{cupData.name}</h3>
                    <h4>{`Сезон ${cupData.season}`}</h4>
                    Раздел в разработке.
                </div>
                <img className={stl['cup-logo']} alt="flag" style={{ float: "right" }} src={getFlagById(cupData.t)} />
            </div>
            {cupData && cupID && sortedRounds(cupData.rounds).map((round, index) => {
                return <CupRound key={index} round={round} />

            })}
        </div>
    );
}

export default Cup;
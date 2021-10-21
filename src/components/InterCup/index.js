import { Spin } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useData from '../../hooks/useCupData';
import useDebounce from '../../hooks/useDebounce';
import { cupById_REF } from '../../utils/constants';
import { getFlagById, getIntercupLogoById } from '../../utils/pefl-stings';
import CupRound from '../CupRound';
import stl from './InterCup.module.scss';
// import testCup from '../../assets/tests/cup_93_19'
import testCup from '../../assets/tests/ec_231_18'

import useTimeout from '../../hooks/useTimeout';
import Block from '../Block';
import Group from '../Group';

function InterCup({ _cupId, children, ...restprops }) {
    // const cupIdRef = useRef()
    // const cupDataRef = useRef();

    // console.log(" -!!! Cup component rendered ", _cupId);
    const [cupID, setCupID] = useState()

    useDebounce(() => {
        setCupID(_cupId)
    }, 2000, [_cupId])

    // const { cupData, isLoading, isError } = useData(cupById_REF, cupID, [cupID])
    const [isLoading, setIsLoading] = useState(true)
    const [cupData, setcupData] = useState(true)

    let isError = false;

    useEffect(() => { console.log("cupData  - ", cupData); }, [cupData])
    useTimeout(() => {
        setIsLoading(false);
        setcupData(testCup)
        setCupID("ec_231_18 !!!!!")
    }, 2000)

    const sortedRounds = useCallback(_ => {
        const sorted = [..._].reverse()
        console.log("sorted  - ", sorted);
        console.log("cupData.groups  - ", cupData, cupData.groups);

        if (cupData && cupData.groups) {
            [...sorted].forEach((round, index, arr) => {
                if (!arr[index + 1]) return
                if (+round.roundID - arr[index + 1].roundID > 4) {
                    sorted.splice(index + 1, 0, { groups: cupData.groups })
                    console.log(`###  Groups between ${round.roundID} ${round.name} and ${arr[index + 1].roundID} ${arr[index + 1].name}`);
                }
            });
        }
        return sorted
    }, [cupData])

    useEffect(() => {
        // console.log("useEffect cupId -  ", _cupId);
        // cupIdRef.current = _cupId;
    }, [_cupId])

    // useEffect(() => {
    //     console.log("useEffect  olollolo");
    //     cupIdRef.current = "ololo";
    // }, [])
    if (isError || isLoading) return <Spin />
    if (!cupData || !cupID) return <h1>Выберите турнир <Spin /> <span>{cupID}</span></h1>

    return (
        <div className={stl.root}>
            <h1 style={{ textAlign: 'center', width: "100%" }}>{cupID && cupID}</h1>
            {/* <h2 style={{ textAlign: 'center', width:"100%" }}>{cupIdRef && cupIdRef.current}</h2> */}

            {/* { cupData && JSON.stringify(cupData, null, " ")} */}
            {/* {cupData && cupID && JSON.stringify(sortedRounds(cupData.rounds), null, " ")} */}
            {/* {cupData && cupID && JSON.stringify(cupData.rounds, null, " ")} */}
            <div className={stl.maininfo}>
                <div >

                    <h3>{cupData.name}</h3>
                    <h4>{`Сезон ${cupData.season}`}</h4>
                    <h4>{`Сезон ${cupData._id}`}</h4>
                    <h4>{`Сезон ${cupData.groups && "Groups"}`}</h4>

                    Раздел в разработке.
                </div>
                <img className={stl['cup-logo']}
                    alt="flag"
                    style={{ float: "right", width: "6em", height: "4em" }}
                    src={getIntercupLogoById(cupData.t > 2000 ? cupData.t - 2000 : cupData.t)}
                />
            </div>
            <div>
                {/* {JSON.stringify(cupData.rounds, null, " ")} */}
            </div>
            {cupData && cupID && sortedRounds(cupData.rounds).map((round, index) => {
                return round.groups ? round.groups.map(((group, groupIndex) => <Group key={group._id + index} groupData={cupData.groups[groupIndex]} />))
                // return round.groups ? round.groups.map((group => <Group key={group._id + index} groupData={group} />))
                    : <CupRound key={index} round={round} />

            })}
        </div>

    );
}

export default InterCup;
import { Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import useData from '../../hooks/useCupData';
import useDebounce from '../../hooks/useDebounce';
import { cupById_REF } from '../../utils/constants';
import { getIntercupLogoById } from '../../utils/pefl-stings';
import CupRound from '../CupRound';
import stl from './InterCup.module.scss';
// import testCup from '../../assets/tests/cup_93_19'

import Group from '../Group';

function InterCup({ _cupId, children, filterednation, ...restprops }) {
    // const cupIdRef = useRef()
    // const cupDataRef = useRef();

    // console.log(" -!!! Cup component rendered ", _cupId);
    const [cupID, setCupID] = useState()

    useDebounce(() => {
        setCupID(_cupId)
    }, 2000, [_cupId])

    const { cupData, isLoading, isError } = useData(cupById_REF, cupID, [cupID], { notNullParameters: true })
    // const [isLoading, setIsLoading] = useState(true)
    // const [cupData, setcupData] = useState()
    const [cupGroupsData, setcupGroupsData] = useState()

    // let isError = false;

    // useEffect(() => {
    //     ;
    // console.log("intercupData  - ", cupData);
    // }, [cupData])

    // useTimeout(() => {
    //     // setIsLoading(false);
    //     // setcupData(testCup)
    //     // setcupGroupsData(testCupGroups)
    //     // setCupID("ec_231_18 !!!!!")
    // }, 2000)

    const sortedRounds = useCallback(_ => {
        // console.log("intercupData  - ", cupData);


        const sorted = [..._].reverse()
        // console.log("sorted  - ", sorted);
        // console.log("cupData.groups  - ", cupData, cupData.groups);
        const roundsToDelete = [];

        if (cupData && cupData.groups) {
            [...sorted].forEach((round, index, arr) => {
                if (!arr[index + 1] || !round) return

                if (round.name && round.name.match(/инал/i) && round.name === arr[index + 1].name) {
                    console.log(" ### delete round ", index + 1, arr[index + 1].name, arr[index + 1]);
                    roundsToDelete.push(index + 1)
                }
                const _id = round.roundID && +round.roundID || round.roundId && +round.roundId;
                const _id1 = arr[index + 1].roundID && +arr[index + 1].roundID || arr[index + 1].roundId && +arr[index + 1].roundId;

                if (_id - _id1 > 4) {
                    sorted.splice(index + 1, 0, { groups: cupData.groups })
                }
            });
        }

        if (roundsToDelete[0]) roundsToDelete.forEach(_ => { delete sorted[_] })

        const filteredRounds = sorted.filter(_ => _)
        return filteredRounds

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
            {/* <h1 style={{ textAlign: 'center', width: "100%" }}>{cupID && cupID}</h1> */}
            {/* <h2 style={{ textAlign: 'center', width:"100%" }}>{cupIdRef && cupIdRef.current}</h2> */}

            {/* { cupData && JSON.stringify(cupData, null, " ")} */}
            {/* {cupData && cupID && JSON.stringify(sortedRounds(cupData.rounds), null, " ")} */}
            {/* {cupData && cupID && JSON.stringify(cupData.rounds, null, " ")} */}
            <div className={stl.maininfo}>
                <div >

                    <h3>{cupData.name}</h3>
                    <h4>{`Сезон ${cupData.season}`}</h4>
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
            {cupData && cupID && cupData.rounds && sortedRounds(cupData.rounds).map((round, roundindex) => {
                // if (!round.groups) return <div>{round.roundID}</div>
                return round.groups
                    ? round.groups.map(((group, groupIndex) => {
                        return <Group
                            collapsed
                            key={group._id + roundindex}
                            group={group}
                            _id={group._id}
                            teams={group.pl}
                            filterednation={filterednation}
                        // delay={100 + groupIndex * 500}
                        />
                    }))
                    // ? round.groups.map(((group, groupIndex) => <Group key={group._id + roundindex} groupData={testCupGroups[group._id]} delay={100 + groupIndex * 100} />))
                    // ? round.groups.map(((group, groupIndex) => {
                    //     console.log("OLOLOOLO groups - ", group);
                    //     return <Block header={group.name}>{group._id} {100 + groupIndex * 100}</Block>
                    // }))
                    : <CupRound
                        key={"CupRound" + roundindex}
                        round={round}
                        filterednation={filterednation}
                    />
                // : <CupRound collapsed={round.name !== "Финал"} key={"CupRound" + roundindex} round={round} />

            })}
        </div>

    );
}

export default InterCup;
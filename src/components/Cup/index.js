import { Spin } from 'antd';
import React, { useCallback, useState } from 'react';
import useData from '../../hooks/useCupData';
import useDebounce from '../../hooks/useDebounce';
import { cupById_REF } from '../../utils/constants';
import { getFlagById } from '../../utils/pefl-stings';
import CupRound from '../CupRound';
import stl from './Cup.module.scss';

function Cup({ _cupId, children, ...restprops }) {
    const [cupID, setCupID] = useState()

    useDebounce(() => {
        setCupID(_cupId)
    }, 2000, [_cupId])

    const { cupData, isLoading, isError } = useData(cupById_REF, cupID, [cupID], { notNullParameters: true })

    const sortedRounds = useCallback(_ => {
        const sorted = [..._].reverse()
        const roundsToDelete = [];
        [...sorted].forEach((round, index, arr) => {
            if (!arr[index + 1] || !round) return
            round.games.forEach(g => {
                if (g && g.lastGame && Array.isArray(g.lastGame._score)) {
                    const firstGameIndex = arr[index + 1].games.findIndex((prevGame, prevGameIndex) => prevGame.lastGame.team1 === g.lastGame.team2)

                    if (firstGameIndex > -1) g.firstGame = JSON.parse(JSON.stringify(arr[index + 1].games[firstGameIndex].lastGame))
                    console.log(g.lastGame._score, g, round.name);
                    g.lastGame._score = g.lastGame._score[0]
                }
            })

            if (round.name && round.name.match(/инал/i) && round.name === arr[index + 1].name) {
                // console.log(" ### delete round ", index + 1, arr[index + 1].name, arr[index + 1]);
                roundsToDelete.push(index + 1)
            }
        });


        if (roundsToDelete[0]) roundsToDelete.forEach(_ => { delete sorted[_] })

        const filteredRounds = sorted.filter(_ => _)
        return filteredRounds
    }, [])

    // useEffect(() => {
    //     // cupIdRef.current = _cupId;
    // }, [cupData])


    if (isError || isLoading) return <Spin />
    if (!cupData || !cupID) return <h1>Выберите турнир <Spin /></h1>

    return (
        <div className={stl.root}>
            <div className={stl.maininfo}>
                <div >

                    <h3>{cupData.name}</h3>
                    <h4>{`Сезон ${cupData.season}`}</h4>
                    Раздел в разработке.
                </div>
                <img className={stl['cup-logo']}
                    alt="flag"
                    style={{ float: "right", width: "6em", height: "4em" }}
                    src={getFlagById(cupData.t > 2000 ? cupData.t - 2000 : cupData.t)}
                />
            </div>
            {cupData && cupID && sortedRounds(cupData.rounds).map((round, index) => {
                return <CupRound key={index} round={round} />

            })}
        </div>
    );
}

export default Cup;
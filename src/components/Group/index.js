import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Block from '../Block';
import ClubLabel from '../ClubLabel';
import Game from '../Game';
import stl from './Group.module.scss';
import { getClubLogoById } from '../../utils/pefl-stings';
import ClubLogo from '../ClubLogo';
import GameScore from '../GameScore';
import cn from 'classnames';

const tableCaptions = ["В", "Н", "П", "Гз", "Гп", "О"];

function Group({ groupData, ...restProps }) {

    // const formGroupData = (_) => {
    //     console.log("formGroupData");
    //     if (!_) return null
    //     const _groupArray = [..._].pl.split('|').map(
    //         teamId => {
    //             return { _id: teamId, games: [], win: 0, draw: 0, lost: 0, plusGoals: 0, minusGoals: 0, scores: 0 }
    //         }
    //     )
    //     return _groupArray
    // }
    const [table, setTable] = useState()

    useEffect(() => {
        if (!groupData) return
        const _teamIndexes = Object.entries(groupData.pl.split('|'))
            // .map(_ => { return { [_[1]]: _[0] } })
            .reduce((acc, _teamId) => {
                return { ...acc, [_teamId[1]]: _teamId[0] }
            }, {})
        console.log("_teamIndexes - ", _teamIndexes);
        const _table = groupData.pl.split('|')
            .map((_, i) => {
                return {
                    _id: _,
                    games: [...Array(4)].map(el => { return {} }),
                    win: 0,
                    draw: 0,
                    lost: 0,
                    conceded: 0,
                    scored: 0,
                    points: 0
                }
            }
            )
        groupData.rounds.forEach(tour => {
            tour.games.map(g => {
                // console.log(" tour  - ", g);
                const homeId = g.team1.j;
                const awayId = g.team2.j;
                const [scored, conceded] = g.lastGame._score.split(':')
                // console.log(" homeId  - awayId  - ", homeId, awayId, _teamIndexes[homeId], _teamIndexes[awayId], scored, conceded);

                _table[_teamIndexes[homeId]].games[_teamIndexes[awayId]].lastGame = JSON.parse(JSON.stringify(g.lastGame));
                _table[_teamIndexes[homeId]].games[_teamIndexes[awayId]].team1 = { j: homeId };
                _table[_teamIndexes[homeId]].games[_teamIndexes[awayId]].team2 = { j: awayId };
                _table[_teamIndexes[homeId]].scored += +scored
                _table[_teamIndexes[homeId]].conceded += +conceded

                _table[_teamIndexes[awayId]].games[_teamIndexes[homeId]].firstGame = JSON.parse(JSON.stringify(g.lastGame));
                _table[_teamIndexes[awayId]].scored += +conceded
                _table[_teamIndexes[awayId]].conceded += +scored
                if (scored === conceded) {
                    _table[_teamIndexes[homeId]].draw += 1;
                    _table[_teamIndexes[homeId]].points += 1;
                    _table[_teamIndexes[awayId]].draw += 1;
                    _table[_teamIndexes[awayId]].points += 1;

                } else if (+scored > +conceded) {
                    _table[_teamIndexes[homeId]].win += 1;
                    _table[_teamIndexes[homeId]].points += 3;
                    _table[_teamIndexes[awayId]].lost += 1;
                    ;
                } else {
                    _table[_teamIndexes[awayId]].win += 1;
                    _table[_teamIndexes[awayId]].points += 3;
                    _table[_teamIndexes[homeId]].lost += 1;;
                }
            })
        });
        console.log("_table  - ", _table);
        setTable([..._table])
        // console.log("_teamINdexes ", Object.entries(groupData.pl.split('|')));
    }, [groupData])

    if (!groupData) return <Spin />

    return (
        <Block header={groupData.name}>
            {/* <h4>
                {groupData._id}
            </h4>
            <h3>
                {JSON.stringify(
                    Object.entries(groupData.pl.split('|')).map(_ => { return { [_[1]]: _[0] } })
                    , null, " ")}
            </h3> */}
            {/* <h3>
                {JSON.stringify(
                    table
                    , null, "")}
            </h3> */}
            {/* <h2>Games</h2> */}
            <div className={stl['group-table']}>

                <div className={stl['table-line']}>
                    <div className={stl['team-name']}><ClubLabel label /></div>
                    {groupData.pl.split('|').map((id, i) => {
                        return <div key={'logos' + i} className={cn(stl['table-cell'], stl['club-logo'])}>
                            {/* <span className={stl["club-logo"]} data-role="club-logo">
                                <img src={getClubLogoById(id)} alt={id} />

                            </span> */}
                            <ClubLogo id={id} />
                        </div>
                    })}
                    {
                        tableCaptions.map((label, index) =>
                            <div key={"label" + index} className={stl['table-smallcell']}> {label}</div>
                        )
                    }
                </div>
                {
                    table && table.map(row => {
                        return (
                            <div key={'row' + row._id} className={stl['table-line']}>

                                <div className={stl['team-name']}><ClubLabel _id={row._id} /></div>
                                {row.games.map((game, gameIndex) => {
                                    return game.firstGame
                                        ? <div key={"g" + row._id + gameIndex} className={stl['table-cell']}>
                                            <GameScore  _game={game.lastGame} />
                                            <GameScore  first reverse _game={game.firstGame}/>
                                        </div>
                                        : <div key={"g" + row._id + gameIndex} className={cn(stl['table-cell'], stl['club-logo'])}>
                                            <ClubLogo id={row._id} />
                                        </div>
                                    // : <div key={"g" + row._id + gameIndex} className={stl['table-cell']}> {getClubLogoById(row._id)}</div>
                                })}
                                <div className={stl['table-smallcell']}>{row.win}</div>
                                <div className={stl['table-smallcell']}>{row.draw}</div>
                                <div className={stl['table-smallcell']}>{row.lost}</div>
                                <div className={stl['table-smallcell']}>{row.scored}</div>
                                <div className={stl['table-smallcell']}>{row.conceded}</div>
                                <div className={stl['table-smallcell']}>{row.points}</div>


                            </div>
                        )
                    })
                }
            </div>
            <Block className={stl.gamesBlock} header="Games" collapsed>

                {groupData.rounds.map((round, roundIndex) => {
                    return <div key={round._id + roundIndex} className={stl.games}>

                        <h4>{round.name}</h4>
                        {round.games.map((g, gameIndex) => <Game key={round._id + round.roundID + gameIndex} game={g} />)}
                    </div>

                })}
            </Block>

        </Block>
    );
}

export default Group;
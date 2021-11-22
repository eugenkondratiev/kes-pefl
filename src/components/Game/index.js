import stl from './Game.module.scss';

import React, { useContext } from 'react';
import GameScore from '../GameScore';
import ClubLabel from '../ClubLabel';
import { ClubsContext } from '../../context/clubs-context';

function Game({ game, grid, smallscreen, filterednation, ...rest }) {
    // console.log("##### game - ", game);
    const { loading: clubsLoading, clubs, getClubFF } = useContext(ClubsContext)

    if (!game || !game.team1 || clubsLoading) return null
    // if (!game || !game.team1 || clubsLoading) return (<div></div>)
    const { team1, team2, firstGame, lastGame } = game;

    if (filterednation && +filterednation > 0
        && getClubFF(team1.j) !== +filterednation
        && getClubFF(team2.j) !== +filterednation
    ) return null

    return (
        <div className={smallscreen ? stl['game-root'] : stl.root} >
            {!smallscreen && <div className={stl.firstTeam}>
                {clubs && <ClubLabel _id={team1.j} />}
            </div>
            }
            {
                !smallscreen &&
                <div className={stl.gameScore}>
                    <GameScore _game={lastGame} />
                    {firstGame && <GameScore first _game={firstGame} />}
                </div>
            }
            {
                !smallscreen &&
                <div className={stl.secondTeam}>
                    {clubs && <ClubLabel _id={team2.j} />}
                </div>
            }
            {
                smallscreen && <div className={stl['team-labels']}>
                    {clubs && <ClubLabel _id={team1.j} smallscreen />}
                    {clubs && <ClubLabel _id={team2.j} smallscreen />}

                </div>
            }
            {
                smallscreen && <div className={stl['game-scores']}>
                    <GameScore _game={lastGame} smallscreen />
                    {firstGame && <GameScore first _game={firstGame} smallscreen />}
                </div>
            }
        </div >

    );
}

export default Game;
import stl from './Game.module.scss';

import React, { useContext } from 'react';
import GameScore from '../GameScore';
import ClubLabel from '../ClubLabel';
import { ClubsContext } from '../../context/clubs-context';

function Game({ game, ...rest }) {
    // console.log("##### game - ", game);
    const { loading: clubsLoading, clubs } = useContext(ClubsContext)
    if (!game) return (<div></div>)
    const { team1, team2, firstGame, lastGame } = game;
    

    return (
        <div className={stl.root}>
            <div className={stl.firstTeam}>
                {clubs && <ClubLabel _id={team1.j} />}
            </div>
            <div className={stl.gameScore}>
                <GameScore _game={lastGame} />

                {firstGame && <GameScore first _game={firstGame} />}
            </div>
            <div className={stl.secondTeam}>
                {clubs && <ClubLabel _id={team2.j} />}

            </div>

        </div>
    );
}

export default Game;
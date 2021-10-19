import stl from './Game.module.scss';

import React, { useContext } from 'react';
import GameScore from '../GameScore';
import ClubLabel from '../ClubLabel';
import { ClubsContext } from '../../context/clubs-context';

function Game({ game, ...rest }) {
    const { team1, team2, firstGame, lastGame } = game;

    const { loading: clubsLoading, clubs } = useContext(ClubsContext)

    return (
        <div className={stl.root}>
            <div className={stl.firstTeam}>
                {clubs && <ClubLabel _id={team1.j} />}
            </div>
            <div className={stl.gameScore}>
                <GameScore _game={lastGame}/>

                {firstGame && <GameScore first _game={firstGame}/>}
            </div>
            <div className={stl.secondTeam}>
                {clubs && <ClubLabel _id={team2.j} />}

            </div>

        </div>
    );
}

export default Game;
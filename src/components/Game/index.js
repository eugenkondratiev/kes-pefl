import stl from './Game.module.scss';

import React from 'react';
import GameScore from '../GameScore';

function Game({team1, team2, scores, ...rest}) {

    const {firstGame, lastGame} = scores;

    return (
        <div className= {stl.root}>
            <div className={stl.firstTeam}>

            </div>
            <div className={stl.gameScore}>
            <GameScore>
                
            </GameScore>
            </div>
            <div className={stl.firstTeam}>

            </div>
            
        </div>
    );
}

export default Game;
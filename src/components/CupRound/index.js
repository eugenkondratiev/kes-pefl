import React from 'react';
import Block from '../Block';
import Game from '../Game';

function CupRound({ round, ...rest }) {
    const { name, games } = round;
    console.log("####round - ", round);
    return (
        <Block header={name}>
            <Game />
            {games && games.map((game, index) => {
                if (game) return <Game key={index} game={game} />
            })}
            {/* <Game game={testCupIreland.rounds[0].games[0]}/> */}

        </Block>
    );
}

export default CupRound;
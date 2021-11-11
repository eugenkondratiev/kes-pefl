import React from 'react';
import Block from '../Block';
import Game from '../Game';

function CupRound({ round, collapsed, ...rest }) {
    const { name, games } = round;
    // console.log("####round - ", round);
    return (
        <Block header={name} collapsed={collapsed}>
            {/* <Game /> */}
            {games && games.map((game, index) => {
                if (!game) return null
                return <Game key={index} game={game} largescreen />
            })}
            {/* <Game game={testCupIreland.rounds[0].games[0]}/> */}

        </Block>
    );
}

export default CupRound;
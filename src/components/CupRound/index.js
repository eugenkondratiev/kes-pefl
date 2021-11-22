import React, { useContext } from 'react';
import { ClubsContext } from '../../context/clubs-context';
import Block from '../Block';
import Game from '../Game';

function CupRound({ round, collapsed, filterednation, ...rest }) {
    const { name, games } = round;
    // console.log("####round - ", round);
    const { loading: clubsLoading, getClubFF } = useContext(ClubsContext)

    if (!round || !round.games || clubsLoading) return null

    if (games && !games.some(game => {
        const _ff = +filterednation;
        return (filterednation && _ff > 0
            && (getClubFF(game.team1.j) === _ff || getClubFF(game.team2.j) === _ff)
        )
    })
        && filterednation && +filterednation > 0
    ) return null

    const roundGames = games && games.map((game, index) => {
        if (!game) return null
        return <Game key={index} game={game} filterednation={filterednation} smallscreen />
    })


    return (
        <Block header={name} collapsed={collapsed}>
            {/* <Game /> */}
            {roundGames}
            {/* <Game game={testCupIreland.rounds[0].games[0]}/> */}

        </Block>
    );
}

export default CupRound;
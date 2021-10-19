import React from 'react';
import stl from './GameScore.module.scss';
import { getGameRef, getHeatmapRef, getTvRef } from '../../utils/pefl-stings';

function GameScore({ _game,first, ...rest }) {
    const { _score, report, tv } = _game;

    console.log("#### game - ", _game);
    return (
        <div className={stl.root}>

            <a
                className={stl['game-score']}
                href={getGameRef(report.j, report.z)}
                target="_blank" rel="noopener noreferrer"
            >
                {first? `(${_score})`: `${_score}`}
            </a>
            <a
                className={stl['game-tv']}
                href={getTvRef(tv.j, tv.z)}
                target="_blank" rel="noopener noreferrer"
            >
                <img   alt="tv" src="http://pefl.ru/skins/refl/img/i3.gif" />
            </a>
            <a
                className={stl['game-heatmap']}
                href={getHeatmapRef(tv.j, tv.z)}
                target="_blank" rel="noopener noreferrer"
            >
                <img alt="hm" src="http://pefl.ru/system/img/g/com.png" />
            </a>
        </div>
    );
}

export default GameScore;
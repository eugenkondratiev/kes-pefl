import React from 'react';
import stl from './GameScore.module.scss';
import { getGameRef, getHeatmapRef, getTvRef } from '../../utils/pefl-stings';
import { SvgBallIcon, SvgStatIcon } from '../../assets/svg/icons';

function GameScore({ _game, first, reverse, onlyscore, ...rest }) {
    // console.log("#### game Score  - ", _game);

    const { _score, report, tv } = _game;
    const scoreArray = _score.split(':')
    const resultScore = reverse ? `${scoreArray[1]}:${scoreArray[0]}` : _score;


    return (
        <div className={stl.root}>

            {report.z
                ? <a
                    className={stl['game-score']}
                    href={getGameRef(report.j, report.z)}
                    target="_blank" rel="noopener noreferrer"
                    title="Открыть отчет"
                >
                    {first ? `(${resultScore})` : `${resultScore}`}
                </a>
                : <span className={stl['game-score']}>{first ? `(${resultScore})` : `${resultScore}`}</span>}
            {tv.z && !onlyscore && <a
                className={stl['game-tv']}
                href={getTvRef(tv.j, tv.z)}
                target="_blank" rel="noopener noreferrer"
            >
                <SvgBallIcon title="Открыть ТВ" viewBox="0 0 450 480" />
                {/* <img alt="tv" src="http://pefl.ru/skins/refl/img/i3.gif" /> */}
            </a>}
            {tv.z && !onlyscore && <a
                className={stl['game-heatmap']}
                href={getHeatmapRef(tv.j, tv.z)}
                target="_blank" rel="noopener noreferrer"
            >
                {/* <img alt="hm" src="http://pefl.ru/system/img/g/com.png" /> */}
                <SvgStatIcon title="Открыть теплокарту" />
            </a>}
        </div>
    );
}

export default GameScore;
import React, { useContext } from 'react';
import { SvgPlayerIcon, SvgIntercupsIcon, SvgCupsIcon } from '../../assets/svg/icons';
import { NationsContext } from '../../context/nation-context';
import { ClubsContext } from '../../context/clubs-context';
import LayerPage from '../LayerPage';
import { Spin } from 'antd';
function HomePage(props) {

    const nationsContext = useContext(NationsContext);
    const clubsContext = useContext(ClubsContext);

    return (
        <LayerPage mainCaption="Добро пожаловать">
            Тут будет что-то , но не сейчас

            <SvgPlayerIcon height="1em" width="1em" />
            <SvgCupsIcon height="1em" width="1em" />
            <SvgIntercupsIcon height="1em" width="1em" />
            <div>

                {nationsContext.loading && <Spin />}
                {String(nationsContext.loading)}
                {!nationsContext.loading && <span>{nationsContext.nations && JSON.stringify(nationsContext.getNation(12))}</span>}
                {!nationsContext.loading && <span>{nationsContext.nations && JSON.stringify(nationsContext.nations[11])}</span>}
            </div>

            <div>
                {clubsContext.loading && <Spin />}

                {String(clubsContext.loading)}
                {!clubsContext.loading && <span>{clubsContext.clubs && JSON.stringify(clubsContext.getClub(148))}</span>}

            </div>
        </LayerPage>
    );
}

export default HomePage;
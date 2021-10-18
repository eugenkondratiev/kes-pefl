import React, { useContext } from 'react';
import { SvgPlayerIcon, SvgIntercupsIcon, SvgCupsIcon } from '../../assets/svg/icons';
import { NationsContext } from '../../context/nation-context';
import { ClubsContext } from '../../context/clubs-context';
import LayerPage from '../LayerPage';
import { Spin } from 'antd';
import Block from '../../components/Block';
import ClubLabel from '../../components/ClubLabel';


function HomePage(props) {

    const nationsContext = useContext(NationsContext);
    const clubsContext = useContext(ClubsContext);

    return (
        <LayerPage mainCaption="Добро пожаловать">
            Тестовый контент
            <SvgPlayerIcon height="4em" width="4em" />
            <Block>

                {nationsContext.loading && <Spin />}
                {String(nationsContext.loading)}
                {!nationsContext.loading && <span>{nationsContext.nations && JSON.stringify(nationsContext.getNation(12))}</span>}
                {!nationsContext.loading && <span>{nationsContext.nations && JSON.stringify(nationsContext.nations[11])}</span>}
            </Block>

            <Block>
                {clubsContext.loading && <Spin />}

                {String(clubsContext.loading)}
                {!clubsContext.loading && clubsContext.clubs && <div>



                    <span>{JSON.stringify(clubsContext.getClub(148))}</span>
                    <span>{<ClubLabel _id="148" />}</span>
                    <span>{<ClubLabel _id="11" />}</span>
                    <span>{<ClubLabel />}</span>
                    <span>{<ClubLabel _id="-1" />}</span>
                </div>
                }
                

            </Block>
        </LayerPage>
    );
}

export default HomePage;
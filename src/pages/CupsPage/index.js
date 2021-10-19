
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Spin, Select } from 'antd';
import Block from '../../components/Block';
import { CupsContext } from '../../context/cups-context';
import LayerPage from '../LayerPage';
import testCupIreland from '../../assets/tests/cup_93_19';
import { NationsContext } from '../../context/nation-context';
import CupsSelector from '../../components/CupSelector';
import Game from '../../components/Game';
import { ClubsContext } from '../../context/clubs-context';

const { Option } = Select;

function CupsPage(props) {

    // const { loading: cupsLoading, cups, getFfCupData, getCups, getFfCups } = useContext(CupsContext);
    // const { loading: cupsLoading, cups } = useContext(CupsContext);
    const cupsContext = useContext(CupsContext);
    const { loading: cupsLoading, cups, getFfCups, getFfCupData } = cupsContext;

    // const { loading: nationsLoading, getNation, nations } = useContext(NationsContext);

    // const { loading: clubsLoading, clubs } = useContext(ClubsContext)


    // const [cupId, setCupId] = useState(null);
    // const [ffId, setFfId] = useState(null);

    // const [cupType, setCupTupe] = useState(null);

    // const [cupSeason, setCupSeason] = useState(null);

    // const [cupData, setCupData] = useState(null);

    // const [federations, setFederations] = useState(null);
    // const [ffCups, setFfCups] = useState(null);
    // const [seasonsList, setSeasonsList] = useState(null);


    const typeRef = useRef();

    // useEffect(() => {
    //     if (!cups) return;
    //     console.log("UseEffect cups");
    //     const _federations = cups.reduce((acc, _ff, _ffId) => {
    //         // console.log(" #### OPTION ", _ffId, _ff, acc);
    //         if (!_ff) return acc
    //         const nation = getNation(_ffId);
    //         if (nation[2]) acc.push([_ffId, nation[0]])
    //         return acc
    //     }, [])
    //     console.log(" ######### - federations", federations);
    //     setFederations(_federations.sort((a, b) => a[1].localeCompare(b[1])))
    // }, [cups])

    // useEffect(() => {
    //     if (!cups || !ffId) return;
    //     const ffCups = getFfCups(ffId);
    //     console.log("getFfCups --- ", ffCups);
    //     const ffCupsArray = [];
    //     if (ffCups["cup"]) ffCupsArray.push(["cup", "Кубок"])
    //     if (ffCups["supercup"]) ffCupsArray.push(["supercup", "Суперубок"])
    //     if (ffCups["extracup"]) ffCupsArray.push(["extracup", ffCups["extracup"].name])
    //     setFfCups(ffCupsArray);

    // }, [ffId]);

    // useEffect(() => {
    //     if (!cups || !cupType || !ffId) return;
    //     const _seasons = getFfCupData(ffId, cupType);
    //     // const seasonsArray = [];


    //     if (_seasons && _seasons.s) {

    //         setSeasonsList(_seasons.s.sort((a, b) => +a - +b));
    //         console.log("getFfCupData --- ", _seasons, seasonsList);
    //         if (!_seasons.s.includes(cupSeason)) setCupSeason(_seasons.s[0])
    //     }

    // }, [ffId, cupType]);


    // useEffect(() => {
    //     if (cupType) setCupTupe('cup');
    // }, [ffCups])

    // useEffect(() => {
    //     setCupId(`${cupType === "extracup" ? "cup" : cupType}_${ffId}_${cupSeason}`);
    // }, [cupType, ffId, cupSeason])





    console.log("#### cupPage rendered !!!");

    return (
        <LayerPage mainCaption="История кубков">
            <CupsSelector />

            <Block header={testCupIreland._id}>
                {/* {JSON.stringify(testCupIreland, null, " ")} */}
                {testCupIreland.name}
                {testCupIreland.season}
                <Game game={testCupIreland.rounds[0].games[0]}/>
                <Game game={testCupIreland.rounds[0].games[1]}/>
                <Game game={testCupIreland.rounds[0].games[2]}/>
                {/* {testCupIreland.rounds[0].games[0]} */}
            </Block>
            {/* <Block header="">
                Раздел в разработке
                {cupsContext.loading && <Spin />}

                {String(cupsContext.loading)}
                {!cupsContext.loading && cupsContext.cups && <div>



                    <div>{JSON.stringify(cupsContext.getFfCupData(93, 'cup'))}</div>
                    <div>{JSON.stringify(cupsContext.getFfCupData(93, 'supercup'))}</div>
                    <div>{JSON.stringify(cupsContext.getFfCupData(172, 'extracup'))}</div>
                    <div>{JSON.stringify(cupsContext.getIntercupData(231))}</div>

                </div>
                }

            </Block> */}
        </LayerPage>
    );
}

export default CupsPage;
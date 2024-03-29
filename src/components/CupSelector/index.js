import React, { useContext, useEffect, useRef, useState } from 'react';
import { Spin, Select } from 'antd';
import Block from '../../components/Block';
import { CupsContext } from '../../context/cups-context';
// import testCupIreland from '../../assets/tests/cup_93_19';
import { NationsContext } from '../../context/nation-context';
import stl from './CupSelector.module.scss';
import Copy2Clipboard from '../Copy2Clipboard';

const { Option } = Select;



function CupsSelector({ onUpdateId, initCupId, ...restprops }) {

    const cupsContext = useContext(CupsContext);
    const { loading: cupsLoading, cups, getFfCups, getFfCupData } = cupsContext;

    const { loading: nationsLoading, getNation, nations } = useContext(NationsContext);
    const [initType, initFfId, initSeason] = initCupId ? initCupId.split('_') : [];

    const [cupId, setCupId] = useState(null);
    const [ffId, setFfId] = useState(initFfId);

    const [cupType, setCupTupe] = useState(initType);

    const [cupSeason, setCupSeason] = useState(initSeason);

    // const [cupData, setCupData] = useState(null);

    const [federations, setFederations] = useState(null);
    const [ffCups, setFfCups] = useState(null);
    const [seasonsList, setSeasonsList] = useState(null);


    const typeRef = useRef();

    useEffect(() => {
        if (!cups) return;
        // console.log("UseEffect cups");
        const _federations = cups.reduce((acc, _ff, _ffId) => {
            // console.log(" #### OPTION ", _ffId, _ff, acc);
            if (!_ff) return acc
            const nation = getNation(_ffId);
            if (nation[2]) acc.push([_ffId, nation[0]])
            return acc
        }, [])
        // console.log(" ######### - federations", federations);
        setFederations(_federations.sort((a, b) => a[1].localeCompare(b[1])))
    }, [cups])

    useEffect(() => {
        if (!cups || !ffId) return;
        const ffCups = getFfCups(ffId);
        // console.log("getFfCups --- ", ffCups);
        const ffCupsArray = [];
        if (ffCups["cup"]) ffCupsArray.push(["cup", "Кубок"])
        if (ffCups["supercup"]) ffCupsArray.push(["supercup", "Суперкубок"])
        if (ffCups["extracup"]) ffCupsArray.push(["extracup", ffCups["extracup"].name])
        setFfCups(ffCupsArray);

    }, [ffId]);

    useEffect(() => {
        if (!cups || !cupType || !ffId) return;
        const _seasons = getFfCupData(ffId, cupType);
        // const seasonsArray = [];


        if (_seasons && _seasons.s) {

            setSeasonsList(_seasons.s.sort((a, b) => +b - +a));
            // console.log("getFfCupData --- ", _seasons, seasonsList);
            if (!_seasons.s.includes(cupSeason)) setCupSeason(_seasons.s[0])
        }

    }, [ffId, cupType]);


    useEffect(() => {
        if (cupType) setCupTupe('cup');
    }, [ffCups])

    useEffect(() => {
        const newId = `${cupType === "extracup" ? "cup" : cupType}_${ffId}_${cupSeason}`;

        setCupId(newId);
        if (cupType && ffId && cupSeason) {
            onUpdateId(newId)
        }
    }, [cupType, ffId, cupSeason])

    const ffSelectHandler = (value) => {
        setFfId(value);

    }

    const typeSelectHandler = (value) => {
        // setCupTupe(value === "extracup" ? "cup" : value);
        setCupTupe(value);
        const intFF = +ffId;

        if (value === "extracup" && intFF < 2000) setFfId(intFF + 2000)
        if (value !== "extracup" && intFF > 2000) setFfId(intFF - 2000)
    }
    const seasonChangeHandler = (value) => {
        // console.log(`selected  season ${value}`);
        setCupSeason(value)
    }

    return (
        <Block header="Выбор турнира">
            {/* {JSON.stringify(federations)} */}
            {!nationsLoading && nations && cups && <form className={stl.root}>
                {/* <div>{cupId && cupId}</div> */}
                <Select
                    showSearch
                    className={stl['cup-selector']}
                    style={{ width: "25ch" }}
                    loading={cupsLoading}
                    onChange={ffSelectHandler}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="Выбор федерации"
                >
                    {
                        !cupsLoading && federations && federations.map((_ff) => {
                            // console.log(" #### OPTION ", _ffId, _ff);
                            if (_ff[0]) return <Option key={_ff[0]} value={_ff[0]}>{_ff[1]}</Option>
                        })
                    }
                </Select>
                {ffId && <Select
                    className={stl['cup-selector']}
                    ref={typeRef}
                    value={cupType}
                    loading={cupsLoading}
                    onChange={typeSelectHandler}
                    // defaultValue="cup"
                    placeholder="Выбор турнира"
                    style={{ width: "25ch" }}
                >
                    {
                        !cupsLoading && ffCups && ffCups.map(([_type, _name], index) => {
                            return <Option key={index} value={_type}>{_name}</Option>
                        })
                    }
                </Select>}
                {cupType && <Select
                    className={stl['cup-selector']}
                    style={{ width: "8ch" }}
                    value={cupSeason}
                    onChange={seasonChangeHandler}
                    placeholder="Выбор сезона"

                >
                    {
                        !cupsLoading && seasonsList && seasonsList.map((season) => {
                            return <Option key={season} value={season}>{season}</Option>
                        })
                    }
                </Select>}
                {cupType && ffId && cupSeason && <Copy2Clipboard
                    copytext={`${document.location.origin}/cup/${cupType === "extracup" ? "cup" : cupType}_${ffId}_${cupSeason}`}
                />}
            </form>
            }
        </Block>
    );
}

export default CupsSelector;
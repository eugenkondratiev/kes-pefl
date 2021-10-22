import React, { useContext, useEffect, useRef, useState } from 'react';
import { Spin, Select } from 'antd';
import Block from '../Block';
import { CupsContext } from '../../context/cups-context';
// import testCupIreland from '../../assets/tests/cup_93_19';
import { NationsContext } from '../../context/nation-context';
import stl from './IntercupSelector.module.scss';

const { Option } = Select;



function IntercupsSelector({ onUpdateId, ...restprops }) {

    const cupsContext = useContext(CupsContext);
    const { loading: cupsLoading, intercups: _cups, getIntercupData, getIntercups } = cupsContext;

    const { loading: nationsLoading, getNation, nations } = useContext(NationsContext);


    const [cupId, setCupId] = useState(null);


    const [intercupId, setintercupId] = useState(null);
    const [cupSeason, setCupSeason] = useState(null);

    // const [cupData, setCupData] = useState(null);

    const [intercups, setIntercups] = useState(null);
    const [seasonsList, setSeasonsList] = useState(null);


    const typeRef = useRef();

    useEffect(() => {
        if (!_cups) return;
        // console.log("useEffect cups", _cups);

        // const _intercups = cups.reduce((acc, _intercup, _intercupId) => {
        //     // console.log(" #### OPTION ", _intercupId, _intercup, acc);
        //     if (!_intercup) return acc
        //     const nation = getNation(_intercupId);
        //     if (nation[2]) acc.push([_intercupId, nation[0]])
        //     return acc
        // }, [])
        const _intercups = Object.entries(_cups)
            .map(intercup => [intercup[0], intercup[1].name])
            .sort((a, b) => a[1].localeCompare(b[1]))
        // console.log("_intercups -", _intercups);
        // console.log(" ######### - intercups", intercups);
        setIntercups(_intercups)
    }, [_cups])

    // useEffect(() => {
    //     if (!cups || !intercupId) return;
    //     const intercupCups = getIntercupData(intercupId);
    //     // console.log("getintercupCups --- ", intercupCups);
    //     const intercupCupsArray = [];
    //     if (intercupCups["cup"]) intercupCupsArray.push(["cup", "Кубок"])
    //     if (intercupCups["supercup"]) intercupCupsArray.push(["supercup", "Суперубок"])
    //     if (intercupCups["extracup"]) intercupCupsArray.push(["extracup", intercupCups["extracup"].name])
    //     setintercupCups(intercupCupsArray);

    // }, [intercupId]);

    useEffect(() => {
        if (!_cups || !intercupId) return;
        const _intercup = getIntercupData(intercupId);
        // const seasonsArray = [];


        if (_intercup && _intercup.s) {

            setSeasonsList(_intercup.s.sort((a, b) => +b - +a));
            // console.log("getintercupCupData --- ", _seasons, seasonsList);
            if (!_intercup.s.includes(cupSeason)) setCupSeason(_intercup.s[0])
        }

    }, [intercupId]);


    // useEffect(() => {
    //     if (cupType) setCupTupe('cup');
    // }, [intercupCups])

    useEffect(() => {
        const newId = `ec_${intercupId}_${cupSeason}`;
        // console.log("#### newId   cupType, intercupId, cupSeason- " , newId, cupType, intercupId, cupSeason);

        setCupId(newId);
        if (intercupId && cupSeason) {
            console.log("#### newId   to Cups - ", newId);
            onUpdateId(newId)
        }
    }, [intercupId, cupSeason])

    const intercupSelectHandler = (value) => {
        // console.log(`selected  intercup ${value}`);
        setintercupId(value);

    }

    const seasonChangeHandler = (value) => {
        // console.log(`selected  season ${value}`);
        setCupSeason(value)
    }

    return (
        <Block header="Выбор турнира">
            {/* {JSON.stringify(intercups)} */}
            {!nationsLoading && nations && _cups && intercups && <form className={stl.root}>
                {/* <div>{cupId && cupId}</div> */}
                <Select className={stl['cup-selector']}
                    style={{ width: "25ch" }}
                    loading={cupsLoading}
                    onChange={intercupSelectHandler}
                    placeholder="Выбор кубка"
                >
                    {
                        !cupsLoading && intercups && intercups.map((_intercup, inercupindex) => {
                            // console.log(" #### OPTION ", inercupindex, _intercup);
                            if (_intercup[1]) return <Option key={"inercupindexKey" + inercupindex} value={_intercup[0]}>{_intercup[1]}</Option>
                        })
                    }
                </Select>
                {/* {intercupId && <Select
                        ref={typeRef}
                        value={cupType}
                        loading={cupsLoading}
                        onChange={typeSelectHandler}
                        // defaultValue="cup"
                        placeholder="Выбор турнира"
                        style={{ width: "25ch" }}
                    >
                        {
                            !cupsLoading && intercupCups && intercupCups.map(([_type, _name], index) => {
                                return <Option key={index} value={_type}>{_name}</Option>
                            })
                        }
                    </Select>} */}

                {intercupId && <Select
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
            </form>
            }
        </Block>
    );
}

export default IntercupsSelector;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Select } from 'antd';
import Block from '../Block';
import { CupsContext } from '../../context/cups-context';
import { NationsContext } from '../../context/nation-context';
import stl from './IntercupSelector.module.scss';
import Copy2Clipboard from '../Copy2Clipboard';

const { Option } = Select;



function IntercupsSelector({ onUpdateId, onFilteredNation, ...restprops }) {

    const cupsContext = useContext(CupsContext);
    const { loading: cupsLoading, intercups: _cups, cups, getIntercupData, getIntercups } = cupsContext;

    const { loading: nationsLoading, getNation, nations } = useContext(NationsContext);


    const [cupId, setCupId] = useState(null);


    const [intercupId, setintercupId] = useState(null);
    const [cupSeason, setCupSeason] = useState(null);

    // const [cupData, setCupData] = useState(null);

    const [intercups, setIntercups] = useState(null);
    const [seasonsList, setSeasonsList] = useState(null);
    const [filteredNation, setFilteredNation] = useState(null);
    const [federations, setFederations] = useState(null);


    const typeRef = useRef();

    useEffect(() => {
        if (!_cups) return;
        const _intercups = Object.entries(_cups)
            .map(intercup => [intercup[0], intercup[1].name])
            .sort((a, b) => a[1].localeCompare(b[1]))
        setIntercups(_intercups)
    }, [_cups])
    useEffect(() => {
        if (!cups) return;
        // console.log("UseEffect cups");
        const _federations = cups.reduce((acc, _ff, _ffId) => {
            if (!_ff) return acc
            const nation = getNation(_ffId);
            if (nation[2]) acc.push([_ffId, nation[0]])
            return acc
        }, [])
        setFederations(_federations.sort((a, b) => a[1].localeCompare(b[1])))
    }, [cups])

    useEffect(() => {
        if (!_cups || !intercupId) return;
        const _intercup = getIntercupData(intercupId);
        // const seasonsArray = [];


        if (_intercup && _intercup.s) {

            setSeasonsList(_intercup.s.sort((a, b) => +b - +a));
            if (!_intercup.s.includes(cupSeason)) setCupSeason(_intercup.s[0])
        }

    }, [intercupId]);


    // useEffect(() => {
    //     if (cupType) setCupTupe('cup');
    // }, [intercupCups])

    useEffect(() => {
        const newId = `ec_${intercupId}_${cupSeason}`;

        setCupId(newId);
        if (intercupId && cupSeason) {
            onUpdateId(newId)
        }
    }, [intercupId, cupSeason])

    const intercupSelectHandler = (value) => {
        setintercupId(value);

    }

    const seasonChangeHandler = (value) => {
        setCupSeason(value)
    }

    const ffSelectHandler = (value) => {
        setFilteredNation(value);
        onFilteredNation(value)
    }

    return (
        <Block
            header="Выбор турнира"
            style={{ color: 'red', width: "45ch" }}
        >
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
                {intercupId && cupSeason && <Copy2Clipboard
                    copytext={`${document.location.origin}/intercup/ec_${intercupId}_${cupSeason}`}
                />}
                {intercupId && cupSeason &&
                    <Select
                        showSearch
                        allowClear
                        className={stl['cup-selector']}
                        style={{ width: "25ch" }}
                        loading={cupsLoading}
                        onChange={ffSelectHandler}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        placeholder="Фильтр по федерации"
                    >
                        {
                            !cupsLoading && federations && federations.map((_ff) => {
                                // console.log(" #### OPTION ", _ffId, _ff);
                                if (_ff[0]) return <Option key={_ff[0]} value={_ff[0]}>{_ff[1]}</Option>
                            })
                        }

                    </Select>}
                <div>
                    {filteredNation}
                </div>
            </form>
            }
        </Block>
    );
}

export default IntercupsSelector;
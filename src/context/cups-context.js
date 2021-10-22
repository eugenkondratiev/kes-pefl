import React, { useState, useEffect, createContext } from 'react';
import { NETLIFY_FUNCTIONS } from '../utils/constants';

import fetchOwnApi from '../mongo/fetch-api-data';
// import { NationsContext } from './nation-context';

const cupIds_REF = NETLIFY_FUNCTIONS + 'cups/cupids';
const intercupIds_REF = NETLIFY_FUNCTIONS + 'cups/ecs';
const extracupIds_REF = NETLIFY_FUNCTIONS + 'cups/extras';


export const CupsContext = createContext();
// const CupsContext = init => useContext(Context);
// const CupsContext = useContext(Context);



export const CupsProvider = ({ children }) => {
    const [cups, setCups] = useState(null)
    const [intercups, setIntercups] = useState(null)

    const [loading, setLoading] = useState(false)

    const getCups = () => {
        // console.log("getCup  done ", _id);
        return cups
    }
    const getFfCups = _ffId => {
        // console.log("getFfCups  done ", _ffId);
        const intFF = +_ffId;
        return cups[intFF > 2000 ? intFF - 2000 : intFF]
    }

    const getFfCupData = (_ffId, type) => {
        // console.log("getFfCupData  done ", _ffId, type);
        const intFF = +_ffId;

        return cups[intFF > 2000 ? intFF - 2000 : intFF][type]
    }


    const getIntercups = () => {
        // console.log("getCup  done ", _id);
        return intercups
    }
    const getIntercupData = _id => {
        // console.log("getCup  done ", _id);
        return intercups[_id]
    }


    // const { loading:nationsLOading, nations, getNation} = useContext(NationsContext)

    // console.log("getNation - ",getNation, nationsLOading, nations,);

    const transformCupsArray = (_) => {
        const cupsArray = [];
        [..._].forEach(({ _id }) => {
            const [type, sFfId, season] = _id.split('_');
            const ffId = +sFfId;

            if (ffId > 0 && ffId < 2000) {
                if (cupsArray[ffId]) {
                    if (!cupsArray[ffId][type]) {
                        cupsArray[ffId][type] = { s: [] }
                    }
                    cupsArray[ffId][type].s.push(season);

                } else {
                    cupsArray[ffId] = {
                        [type]: {
                            s: [season]
                        }
                    };
                }
            }

        })
        return cupsArray
    }

    const transformExtracupsArray = (_, cups) => {
        const cupsArray = [...cups];
        [..._].forEach(({ _id, name: _name }) => {
            const [type, sFfId, season] = _id.split('_');
            const ffId = +sFfId - 2000;
            console.log(" ##### ffId and name -", ffId, _name);
            if (ffId > 0) {
                if (cupsArray[ffId]) {
                    if (!cupsArray[ffId]['extracup']) {
                        cupsArray[ffId]['extracup'] = { id: sFfId, name: _name, s: [] }
                        console.log("NEW FFId.extracup", _id);

                    }
                    cupsArray[ffId]['extracup'].s.push(season);
                } else {
                    cupsArray[ffId] = {
                        'extracup': { id: sFfId, name: _name, s: [season] }
                    };
                    console.log("NEW FFId from extracup", _id);

                }
            }

        })
        return cupsArray
    }

    const transformIntercupsArray = (_) => {
        const intercupsArray = {};
        [..._].forEach(({ _id, name: _name }) => {
            const [type, sFfId, season] = _id.split('_');
            const ecId = +sFfId;


            if (+ecId > 0) {
                if (intercupsArray[ecId]) {
                    intercupsArray[ecId].s.push(season);

                } else {
                    intercupsArray[ecId] = {
                        name: _name,
                        s: [season]
                    };
                };
            }
        })
        return intercupsArray
    }


    const getAllCups = async () => {
        setLoading(true);
        // if (localStorage.cups  && localStorage.cupsLastUpdate && ((Number(Date.now()) - Number(localStorage.getItem("cupsLastUpdate"))) < 86400 * 1000 * 61)) {
        if (localStorage.cups && localStorage.intercups && localStorage.cupsLastUpdate && ((Number(Date.now()) - Number(localStorage.getItem("cupsLastUpdate"))) < 86400 * 1000 * 61)) {
            // console.log("localStorage.cups - ", localStorage.cups);
            // console.log("localStorage.intercups - ", localStorage.intercups);
            const cupsArray = JSON.parse(localStorage.cups);
            const intercupsArray = JSON.parse(localStorage.intercups);
            // console.log("#### get cups from localStorage - ", cupsArray);
            // console.log("#### get cups from localStorage - ", intercupsArray);
            setCups((prev) => cupsArray)
            setIntercups((prev) => intercupsArray)
            setLoading(prev => false);
        } else {

            try {
                const response = await fetchOwnApi(cupIds_REF);

                console.log("#### context Cups response -  ", response);
                console.log('#### -  response.error ? null : response.data - ', response.error ? null : response.data);

                const responseExtras = await fetchOwnApi(extracupIds_REF);

                console.log("#### context Cups responseExtras -  ", responseExtras);
                console.log('#### -  responseExtras.error ? null : responseExtras.data - ', responseExtras.error ? null : responseExtras.data);

                const responseIntercups = await fetchOwnApi(intercupIds_REF);
                console.log("#### context Cups responseIntercups -  ", responseIntercups);
                console.log('#### -  responseIntercups.error ? null : responseIntercups.data - ', responseIntercups.error ? null : responseIntercups.data);


                setCups((prev) => {
                    const onlyCupsArray = transformCupsArray(response.data);
                    const cupsArray = transformExtracupsArray(responseExtras.data, onlyCupsArray);

                    const intercupsArray = transformIntercupsArray(responseIntercups.data);

                    // console.log("transformCupsArray(response.data) -", cupsArray);
                    // console.log("transformCIntercupsArray(response.data) -", intercupsArray);
                    console.log("#### - cupsArray - ", cupsArray);
                    console.log("#### - intercupsArray - ", intercupsArray);

                    localStorage.setItem("cups", JSON.stringify(cupsArray))
                    localStorage.setItem("intercups", JSON.stringify(intercupsArray))
                    localStorage.setItem("cupsLastUpdate", JSON.stringify(Date.now()))

                    return response.error
                        ? null
                        : cupsArray
                }
                );


                setLoading(prev => false);

            } catch (error) {
                setCups((prev) => null
                );
                setLoading(prev => false);

                console.log("getCups error ", error);
            }
        }

    }

    useEffect(() => {
        getAllCups();
    }, [])

    return (
        <CupsContext.Provider
            value={{
                cups,
                intercups,
                loading,
                getCups,
                getFfCups,
                getFfCupData,
                getIntercups,
                getIntercupData
            }}
        >
            {children}
        </CupsContext.Provider>
    )
}
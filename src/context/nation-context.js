import React, { useState, useEffect, useContext, createContext } from 'react';
import { NETLIFY_FUNCTIONS } from '../utils/constants';

import fetchOwnApi from '../mongo/fetch-api-data';
const NATIONS_REF = NETLIFY_FUNCTIONS + 'maininfo/nations';



const transformNationsArray = (_) => {
    const nationsArray = [];
    [..._].forEach(({ _id, name, flagId, ff }) => {
        nationsArray[+_id] = [name, flagId, ff && ff];
    })
    return nationsArray
}

export const NationsContext = createContext();
// const NationsContext = init => useContext(Context);
// const NationsContext = useContext(Context);

export const NationsProvider = ({ children }) => {
    const [nations, setNations] = useState(null)
    const [loading, setLoading] = useState(false)

    const getNation = _id => {
        console.log("getNation  done ");
        return nations[+_id]
    }

    const getNations = async () => {

        setLoading(true);
        if (localStorage.nations && localStorage.nationsLastUpdate && ( (Number(Date.now()) - Number(localStorage.getItem("nationsLastUpdate")) ) < 86400*1000*61)) {
            // console.log("localStorage.nations - ", localStorage.nations);
            const nationsArray = JSON.parse(localStorage.nations);
            // console.log("#### get nations from localStorage - ", nationsArray);
            setNations((prev) => nationsArray)
            setLoading(prev => false);
        } else {

            try {
                const response = await fetchOwnApi(NATIONS_REF);
                // console.log("#### context nations response -  ", response);
                // console.log('#### -  response.error ? null : response.data - ', response.error ? null : response.data);

                setNations((prev) => {
                    // console.log("#### - response.data - ", response.data);
                    // console.log("transformNationsArray(response.data) -", transformNationsArray(response.data));
                    const nationsArray = transformNationsArray(response.data);

                        localStorage.setItem("nations", JSON.stringify(nationsArray))
                        localStorage.setItem("nationsLastUpdate", JSON.stringify(Date.now()))

                    return response.error
                        ? null
                        : nationsArray
                }
                );
                setLoading(prev => false);

            } catch (error) {
                setNations((prev) => null
                );
                setLoading(prev => false);

                console.log("getNations error ", error);
            }
        }

    }

    useEffect(() => {
        getNations();
    }, [])

    return (
        <NationsContext.Provider
            value={{
                nations,
                loading,
                getNation
            }}
        >
            {children}
        </NationsContext.Provider>
    )
}
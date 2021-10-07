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
        return nations[+_id]
    }

    const getNations = async () => {
        setLoading(true);
        try {
            const response = await fetchOwnApi(NATIONS_REF);
            console.log("#### context nations response -  ", response);
            console.log('#### -  response.error ? null : response.data - ', response.error ? null : response.data);

            setNations((prev) => {
                console.log("#### - response.data - ", response.data);
                console.log("transformNationsArray(response.data) -", transformNationsArray(response.data));
                return response.error
                    ? null
                    : transformNationsArray(response.data)
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
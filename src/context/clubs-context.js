import React, { useState, useEffect, useContext, createContext } from 'react';
import { NETLIFY_FUNCTIONS } from '../utils/constants';

import fetchOwnApi from '../mongo/fetch-api-data';
import { NationsContext } from './nation-context';
const ClubS_REF = NETLIFY_FUNCTIONS + 'maininfo/clubs';


export const ClubsContext = createContext();
// const ClubsContext = init => useContext(Context);
// const ClubsContext = useContext(Context);



export const ClubsProvider = ({ children }) => {
    const [clubs, setClubs] = useState(null)
    const [loading, setLoading] = useState(false)

    const getClub = _id => {
        console.log("getClub  done ", _id);
        return clubs[+_id]
    }

    const { loading:nationsLOading, nations, getNation} = useContext(NationsContext)

// console.log("getNation - ",getNation, nationsLOading, nations,);

    const transformClubsArray = (_) => {
        const clubsArray = [];
        [..._].forEach(({ _id, name, z, ffId, nominal }) => {
            if (+ffId > 0 ) clubsArray[+_id] = [name, z, ffId, nominal];
        })
        return clubsArray
    }


    const getClubs = async () => {
        if (!nations) return
        setLoading(true);
        if (localStorage.clubs && localStorage.clubsLastUpdate && ( (Number(Date.now()) - Number(localStorage.getItem("clubsLastUpdate")) ) < 86400*1000*61)) {
            console.log("localStorage.clubs - ", localStorage.clubs);
            const clubsArray = JSON.parse(localStorage.clubs);
            console.log("#### get clubs from localStorage - ", clubsArray);
            setClubs((prev) => clubsArray)
            setLoading(prev => false);
        } else {

            try {
                const response = await fetchOwnApi(ClubS_REF);
                console.log("#### context Clubs response -  ", response);
                console.log('#### -  response.error ? null : response.data - ', response.error ? null : response.data);

                setClubs((prev) => {
                    console.log("#### - response.data - ", response.data);
                    const clubsArray = transformClubsArray(response.data);
                    
                    console.log("transformClubsArray(response.data) -", clubsArray);

                        localStorage.setItem("clubs", JSON.stringify(clubsArray))
                        localStorage.setItem("clubsLastUpdate", JSON.stringify(Date.now()))

                    return response.error
                        ? null
                        : clubsArray
                }
                );
                setLoading(prev => false);

            } catch (error) {
                setClubs((prev) => null
                );
                setLoading(prev => false);

                console.log("getClubs error ", error);
            }
        }

    }

    useEffect(() => {
        getClubs();
    }, [nations])

    return (
        <ClubsContext.Provider
            value={{
                clubs,
                loading,
                getClub
            }}
        >
            {children}
        </ClubsContext.Provider>
    )
}
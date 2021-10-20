export const peflUrl = 'http://pefl.ru/'
const checkId = (_id) => {
    return _id && +_id > 0 && +_id
        ? +_id
        : undefined
}

export const getClubLogoById = (_id) => checkId(_id)
    ? `https://raw.githubusercontent.com/eugenkondratiev/kes-pefl/master/src/assets/img/clubs/${+_id}.gif`
    : undefined
// export const getClubLogoById = (_id) => checkId(_id) ? `${peflUrl}system/img/club/${+_id}.gif` : undefined


// export const getFlagById = (_ff) => checkId(_ff) ? `${peflUrl}system/img/flags/${+_ff}.gif` : undefined
export const getFlagById = (_ff) => checkId(_ff) ? `https://mylene.net.ru/pefl/nations/img/flags/mod/${+_ff}.gif` : undefined
export const getIntercupLogoById = (_ff) => checkId(_ff)
    ? `https://raw.githubusercontent.com/eugenkondratiev/kes-pefl/master/src/assets/img/cups/${+_ff}.gif`
    : undefined


export const getClubRef = (_id, z) => checkId(_id)
    ? `${peflUrl}plug.php?p=refl&t=k&j=${_id}&z=${z}`
    : undefined

export const getGameRef = (_j, z) => checkId(_j)
    ? `${peflUrl}plug.php?p=refl&t=if&j=${_j}&z=${z}`
    : undefined


export const getTvRef = (_j, z) => checkId(_j)
    ? `${peflUrl}tv/#/j=${_j}&z=${z}`
    : undefined

export const getHeatmapRef = (_j, z) => checkId(_j)
    ? `${peflUrl}/heatmaps.html?j=${_j}&z=${z}`
    : undefined



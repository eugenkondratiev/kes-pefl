export const peflUrl = 'http://pefl.ru/'
const checkId = (_id) => {
    return _id && +_id > 0 && +_id
        ? +_id
        : undefined
}

export const getClubLogoById = (_id) => checkId(_id) ? `${peflUrl}system/img/club/${+_id}.gif` : undefined
export const getFlagById = (_ff) => checkId(_ff) ? `${peflUrl}system/img/flags/mod/${+_ff}.gif` : undefined

export const getClubRef = (_id, z) => checkId(_id)
    ? `${peflUrl}plug.php?p=refl&t=k&j=${_id}&z=${z}`
    : undefined

//http://pefl.ru/plug.php?p=refl&t=if&j=1231954&z=f8e8f6fd3b04665640e45de652aa430b
export const getGameRef = (_j, z) => checkId(_j)
    ? `${peflUrl}plug.php?p=refl&t=if&j=${_j}&z=${z}`
    : undefined

// http://pefl.ru/skins/refl/img/i3.gif
// http://pefl.ru/tv/#/j=1231952&z=c68d95df9a45571239260cddf3dfcba6
export const getTvRef = (_j, z) => checkId(_j)
    ? `${peflUrl}tv/#/j=${_j}&z=${z}`
    : undefined

//http://pefl.ru/heatmaps2.html?j=1231952&z=c68d95df9a45571239260cddf3dfcba6
export const getHeatmapRef = (_j, z) => checkId(_j)
    ? `${peflUrl}pefl.ru/heatmaps.html?j=${_j}&z=${z}`
    : undefined



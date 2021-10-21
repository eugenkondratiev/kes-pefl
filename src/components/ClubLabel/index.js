import React, { useContext } from 'react';
import { ClubsContext } from '../../context/clubs-context';
import stl from './ClubLabel.module.scss';
import { getClubLogoById, getClubRef, getFlagById } from '../../utils/pefl-stings';
import cn from 'classnames';

function ClubLabel({ _id, label, children }) {
    const { getClub } = useContext(ClubsContext);
    if (label) return <div className={stl["root"]} ><h4>Команда</h4></div>
    const club = _id && getClub(_id);
    // console.log("#### club - ", _id, club);
    if (!club) return null
    const [name, z, ff] = club;

    return (
        <div className={stl["root"]} >
            {/* {String(club)} */}
            <span className={stl["club-logo"]} data-role="club-logo">
                <img src={getClubLogoById(_id)} alt={_id} />

            </span>
            <span className={stl["club-label"]} data-role="club-ref">
                <a href={getClubRef(_id, z)} target="_blank" rel="noopener noreferrer">
                    {name}
                </a>
            </span>
            <span className={stl["ff-flag"]} data-role="club-ff-flag">
                <img src={getFlagById(ff)} alt={ff} />
            </span>


            {children}
        </div>
    );
}

export default ClubLabel;
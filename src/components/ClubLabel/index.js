import React, { useContext } from 'react';
import { ClubsContext } from '../../context/clubs-context';
import stl from './ClubLabel.module.scss';
import { getClubLogoById, getClubRef, getFlagById } from '../../utils/pefl-stings';
import cn from 'classnames';

function ClubLabel({ _id, label, grid, largescreen, children }) {
    const { getClub } = useContext(ClubsContext);
    if (label) return <div className={stl["root"]} ><h4>Команда</h4></div>
    const club = _id && getClub(_id);
    // console.log("#### club - ", _id, club);
    if (!club) return null
    const [name, z, ff] = club;

    const formClubLogo = () => {
        return <span className={largescreen ? stl["club-logo-lg"] : stl["club-logo"]} data-role="club-logo">
            <img src={getClubLogoById(_id)} alt={_id} />
        </span>
    }
    const formClubName = () => {
        return <span className={largescreen ? stl["club-name-lg"] : stl["club-label"]} data-role="club-ref">
            <a href={getClubRef(_id, z)} target="_blank" rel="noopener noreferrer">
                {name}
            </a>
        </span>
    }
    const formClubNation = () => {
        return <span className={largescreen ? stl["club-nation-lg"] : stl["ff-flag"]} data-role="club-ff-flag">
            <img src={getFlagById(ff)} alt={ff} />
        </span>
    }
    return (
        <div className={largescreen ? stl["root-lg"] : stl.root} >
            {/* {String(club)} */}
            {formClubLogo()}
            {formClubName()}
            {formClubNation()}
            {/* {children} */}
        </div>
    );
}

export default ClubLabel;
import React from 'react';
import stl from './ClubLogo.module.scss';
import { getClubLogoById } from '../../utils/pefl-stings';


function ClubLogo({ id, ...props }) {
    if (!id || +id < 0) return

    return (
        <span className={stl["club-logo"]} data-role="club-logo">
            <img src={getClubLogoById(id)} alt={id} />
        </span>
    );
}

export default ClubLogo;
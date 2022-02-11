import React from 'react';

import { ReactComponent as PlayerIcon } from './football-player-running-behind-the-ball-26792.svg'
import { ReactComponent as IntercupsIcon } from './couple-of-football-cones-26338.svg'
import { ReactComponent as CupIcon } from './trophy-football-cup-26479.svg'
import { ReactComponent as BallIcon } from './football-ball-svgrepo-com.svg'
import { ReactComponent as StatIcon } from './statistics-svgrepo-com.svg'
import { ReactComponent as CopyIcon } from './copy-svgrepo-com.svg'
import { ReactComponent as PasteIcon } from './paste-svgrepo-com.svg'
import { ReactComponent as UpIcon } from './up-svgrepo-com.svg'
import { ReactComponent as TournamentIcon } from './tournament-bracket-right-svgrepo-com.svg'
import { ReactComponent as TablesIcon } from './table-svgrepo-com.svg'

import AntdIcon from '../../components/AntdIcon';

export const SvgPlayerIcon = (props) => <AntdIcon node={PlayerIcon} {...props} />;
export const SvgIntercupsIcon = (props) => <AntdIcon node={IntercupsIcon} {...props} />;
export const SvgCupsIcon = (props) => <AntdIcon node={CupIcon} {...props} />;
export const SvgBallIcon = (props) => <AntdIcon node={BallIcon} {...props} />;
export const SvgStatIcon = (props) => <AntdIcon node={StatIcon} {...props} />;
export const SvgCopyIcon = (props) => <AntdIcon node={CopyIcon} {...props} />;
export const SvgPasteIcon = (props) => <AntdIcon node={PasteIcon} {...props} />;
export const SvgTournamentIcon = (props) => <AntdIcon node={TournamentIcon}
    width="1.5em" height="1.5em"
    viewBox="16 0 76 76" {...props}
/>;
export const SvgTablesIcon = (props) => <AntdIcon node={TablesIcon}  {...props}/>;
export const SvgUpIcon = (props) => <AntdIcon node={UpIcon} viewbox="200 200 600 300" {...props} />;


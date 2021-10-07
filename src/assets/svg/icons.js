import React from 'react';

import { ReactComponent as PlayerIcon } from './football-player-running-behind-the-ball-26792.svg'
import { ReactComponent as IntercupsIcon } from './couple-of-football-cones-26338.svg'
import { ReactComponent as CupIcon } from './trophy-football-cup-26479.svg'
import AntdIcon from '../../components/AntdIcon';

export const SvgPlayerIcon = (props) => <AntdIcon node={PlayerIcon} {...props}/>;
export const SvgIntercupsIcon = (props) => <AntdIcon node={IntercupsIcon} {...props}/>;
export const SvgCupsIcon = (props) => <AntdIcon node={CupIcon} {...props}/>;


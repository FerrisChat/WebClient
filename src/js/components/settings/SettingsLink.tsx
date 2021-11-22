import React from 'react';
import { Link } from 'react-router-dom';

import gear from '../../assets/settings_gear.png';

export default function SettingsLink() {
    return (
        <Link to='/settings' className='settings-link'>
            <img src={gear} />
        </Link>
    )
}
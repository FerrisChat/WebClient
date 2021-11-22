import React from 'react';
import { Link } from 'react-router-dom';

import SettingsButton from './SettingsButton';

export default function SettingsSelect() {
    return (
        <div className='settings-select'>
            <div className='settings-buttons'>
                <SettingsButton label='Account' path='account' />
            </div>
            <Link className='settings-button settings-back-button' to='/'>
                Back
            </Link>
        </div>
    )
}
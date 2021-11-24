import React from 'react';
import { Link } from 'react-router-dom';

import SettingsButton from './SettingsButton';

function SectionName({ name }: { name: string }) {
    return <div className='section-name'>{name}</div>
}

export default function SettingsSelect() {
    return (
        <div className='settings-select'>
            <div className='settings-buttons'>
                <SectionName name='Account' />
                <SettingsButton label='Account' path='account' />
                
                <SectionName name='Appearance' />
                <SettingsButton label='Theme' path='theme' />
                <SettingsButton label='Chat' path='chat' />
            </div>
            <br />
            <Link className='settings-button settings-back-button' to='/'>
                Back
            </Link>
        </div>
    )
}
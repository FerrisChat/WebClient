import React from 'react';
import SettingsSelect from '../../components/settings/SettingsSelect';

export default function SettingsLayout({ children }: { children: any | any[] }) {
    return (
        <div className="app-content">
            <SettingsSelect />
            <div className="main">{children}</div>
        </div>
    )
}
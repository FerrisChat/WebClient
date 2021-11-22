import React from 'react';

import GuildSelect from '../components/guilds/GuildSelect';
import SettingsLink from '../components/settings/SettingsLink';

export default function CommonLayout({ children }: { children: any | any[] }) {
    return (
        <div className="app-content">
            <GuildSelect />
            <SettingsLink />
            <div className="main">{children}</div>
        </div>
    )
}
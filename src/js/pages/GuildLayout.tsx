import React from 'react';

import GuildSelect from '../components/guilds/GuildSelect';
import ChannelSelect from '../components/channels/ChannelSelect';
import Members from '../components/members/Members';
import SettingsLink from '../components/settings/SettingsLink';

export default function GuildLayout({ children }: { children: any | any[] }) {
    return (
        <div className="app-content">
            <GuildSelect />
            <SettingsLink />
            <ChannelSelect />
            <div className="main">{children}</div>
            <Members />
        </div>
    )
}
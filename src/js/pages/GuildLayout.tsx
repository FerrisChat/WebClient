import React from 'react';
import GuildSelect from '../components/guilds/GuildSelect';
import ChannelSelect from '../components/channels/ChannelSelect';
import Members from '../components/members/Members';

export default function GuildLayout({ children }: { children: any | any[] }) {
    return (
        <div className="app-content">
            <GuildSelect />
            <ChannelSelect />
            <div className="main">{children}</div>
            <Members />
        </div>
    )
}
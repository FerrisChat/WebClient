import React from 'react';
import GuildSelect from '../components/GuildSelect';
import ChannelSelect from '../components/ChannelSelect';
import Members from '../components/Members';

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
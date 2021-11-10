import React from 'react';
import GuildSelect from '../components/GuildSelect';
import ChannelSelect from '../components/ChannelSelect';

export default function CommonLayout({ children }: { children: any | any[] }) {
    return (
        <div className="app-content">
            <GuildSelect />
            <ChannelSelect />
            <div className="main">{children}</div>
        </div>
    )
}
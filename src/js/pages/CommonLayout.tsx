import React from 'react';
import GuildSelect from '../components/guilds/GuildSelect';

export default function CommonLayout({ children }: { children: any | any[] }) {
    return (
        <div className="app-content">
            <GuildSelect />
            <div className="main">{children}</div>
        </div>
    )
}
import React from 'react';
import GuildButton from './GuildButton';
import NewGuild from './NewGuild';

export default function GuildSelect() {
    return (
        <div className='guild-select'>
            <div className='guild-select-guilds'>
                {window.api!.guilds!.map(guild => <GuildButton id={guild.id_string} key={guild.id_string} name={guild.name} />)}
                <NewGuild />
            </div>
        </div>
    )
}
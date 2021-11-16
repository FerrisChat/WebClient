import React from 'react';
import GuildButton from './GuildButton';

export default function GuildSelect() {
    return (
        <div className='guild-select'>
            <div className='guild-select-guilds'>
                {window.api!.guilds!.map(guild => <GuildButton id={guild.id_string} key={guild.id_string} name={guild.name} />)}
            </div>
        </div>
    )
}
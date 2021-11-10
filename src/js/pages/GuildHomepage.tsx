import React from 'react';
import {
    useNavigate,
    useParams,
} from 'react-router-dom';

import GuildLayout from './GuildLayout';

export default function GuildHomepage() {
    const { guildId } = useParams();
    const guild = window.api!.guilds!.find(guild => guild.id_string == guildId);
    
    if (!guild)
        useNavigate()('/home');

    return (
        <GuildLayout>
            <div className="generic-message">
                <h1>Welcome to <b>{guild!.name}</b>!</h1>
                <p>You may use the channel sidebar on the left to navigate this server.</p>
            </div>
        </GuildLayout>
    )
}
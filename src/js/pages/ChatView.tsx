import React from 'react';
import {
    useNavigate,
    useParams,
} from 'react-router-dom';

import GuildLayout from './GuildLayout';
import Chat from '../components/Chat';

export default function GuildHomepage() {
    const { guildId, channelId } = useParams();
    const guild = window.api!.guilds!.find(guild => guild.id_string == guildId);
    
    if (!guild)
        useNavigate()('/home');

    const channel = guild!.channels!.find(channel => channel.id_string == channelId);
    
    if (!channel)
        useNavigate()('/home');

    return (
        <GuildLayout>
            <Chat channelId={channelId!} />
        </GuildLayout>
    )
}
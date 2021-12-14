import React from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

import ChannelSelect from './ChannelSelect';

const ChannelSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: calc(100vh - 66px);
`;

const GuildInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 32px 0 16px 0;
    font-size: 1.5em;
    font-weight: 600;
`;

export default function ChannelSidebar() {
    const { guildId, channelId } = useParams();
    const guild = window.app.api.guilds!.find(({ id_string }) => id_string == guildId);
    
    if (!guild) {
        useNavigate()('/');
        throw new Error('Could not resolve this guild.')
    }

    return (
        <ChannelSidebarContainer>
            <GuildInfo>
                {guild.name}
            </GuildInfo>
            <ChannelSelect guild={guild} active={channelId == null} />
        </ChannelSidebarContainer>
    )
}
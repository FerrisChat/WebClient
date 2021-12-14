import React from 'react';
import styled from 'styled-components';

import ChannelButton, { ChannelButtonContainer } from './ChannelButton';
import type { Guild } from '../../types/objects';

const ChannelSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 16px;
    overflow-y: auto;
`;

export default function ChannelSelect({ guild, active }: { guild: Guild, active: boolean }) {
    return (
        <ChannelSelectContainer>
            <ChannelButtonContainer to={`/guilds/${guild.id_string}`} active={active}>
                <div>Home</div>
            </ChannelButtonContainer>
            {guild.channels!.map(channel => <ChannelButton channel={channel} key={channel.id_string} />)}
        </ChannelSelectContainer>
    )
}
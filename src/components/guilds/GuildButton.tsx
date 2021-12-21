import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';

import defaultIcon from '../../assets/branding/ferrischat_icon.png';
import type { Guild } from '../../types/objects';

const GuildButtonContainer = styled(Link)`
    padding: 4px 8px;
    cursor: pointer;

    img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        transition: all 0.5s ease;
    }

    img:hover,
    &.active img {
        border-radius: 40% !important;
    }

    &.active img {
        box-shadow: 0 0 48px ${props => props.theme.primary};
    }
`;

export default function GuildButton({ guild }: { guild: Guild }) {
    const guildId = useMatch('/guilds/:guildId')?.params?.guildId;
    const className = guildId === guild.id_string ? 'active' : undefined;

    return (
        <GuildButtonContainer className={className} to={`/guilds/${guild.id_string}`}>
            <img src={guild.icon || defaultIcon} />
        </GuildButtonContainer>
    )
}
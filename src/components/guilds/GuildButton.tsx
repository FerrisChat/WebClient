import React from 'react';
import { Link } from 'react-router-dom';
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
        transition: border-radius 0.5s ease;
    }

    img:hover,
    &.active img {
        border-radius: 40%;
    }
`;

export default function GuildButton({ guild }: { guild: Guild }) {
    return (
        <GuildButtonContainer to={`/guilds/${guild.id_string}`}>
            <img src={defaultIcon} />
        </GuildButtonContainer>
    )
}
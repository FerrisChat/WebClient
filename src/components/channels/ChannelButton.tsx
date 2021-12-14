import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Hashtag from '../svg/Hashtag';
import type { Channel } from '../../types/objects';

import { parseCSSColor } from '../../utils';

export const ChannelButtonContainer = styled(Link)<{ active: boolean }>`
    color: inherit;
    padding: 8px 12px;
    margin: 2px 4px 0 0;
    transition: all 0.3s ease;
    background-color: ${
        props => props.active
            ? parseCSSColor(props.theme.secondary, 0.5).rgba
            : props.theme.tertiary
    };
    font-size: 1.2em;
    display: flex;
    align-items: center;
    border-radius: 6px;

    * {
        opacity: 0.8;
    }

    &:hover {
        color: inherit;
        background-color: ${props => props.theme.secondary};
        
        * {
            opacity: 1;
        }
    }

    span {
        margin-left: 4px;
    }

    span,
    div {
        font-weight: ${props => props.active ? '500' : 'inherit'};
    }
`;

export default function ChannelButton({ channel }: { channel: Channel }) {
    const { guildId, channelId } = useParams();

    return (
        <ChannelButtonContainer
            to={`/guilds/${guildId!}/${channel.id_string}`}
            active={channel.id_string == channelId}
        >
            <Hashtag />
            <span>{channel.name}</span>
        </ChannelButtonContainer>
    )
}
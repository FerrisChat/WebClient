import React from 'react';
import styled from 'styled-components';

import GuildButton from './GuildButton';

const GuildSelectContainer = styled.div`
    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: ${props => props.theme.tertiary};
    padding: 8px 12px;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;

    & > div {
        display: flex;
        flex-direction: column;
        margin: 8px 0px;
    }

    &::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
`;

export default function GuildSelect() {
    return (
        <GuildSelectContainer>
            <div>
                {
                    window.app.api.guilds!.map(
                        guild => <GuildButton guild={guild} key={guild.id_string} />
                    )
                }
            </div>
        </GuildSelectContainer>
    )
}
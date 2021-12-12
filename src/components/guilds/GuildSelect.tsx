import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import GuildButton from './GuildButton';
import HomeIcon from '../svg/HomeIcon';

const GuildSelectContainer = styled.div`
    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: ${props => props.theme.tertiary};
    padding: 8px 6px;
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

const ToHomepage = styled(HomeIcon)`
    width: 48px;
    height: 48px;
`;

const ToHomepageContainer = styled(Link)`
    padding: 6px 12px;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

const Split = styled.hr`
    background-color: ${props => props.theme.text};
    opacity: 0.2;
    width: 80%;
    height: 3px;
    border-radius: 50vw;
`;

export default function GuildSelect() {
    return (
        <GuildSelectContainer>
            <div>
                <ToHomepageContainer to='/'>
                    <ToHomepage />
                </ToHomepageContainer>
                <Split />
                {
                    window.app.api.guilds!.map(
                        guild => <GuildButton guild={guild} key={guild.id_string} />
                    )
                }
            </div>
        </GuildSelectContainer>
    )
}
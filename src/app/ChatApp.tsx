import React from 'react';
import { Route, Routes } from 'react-router';
import styled from 'styled-components';

import GuildSelect from '../components/guilds/GuildSelect';
import GuildHomepage from '../pages/guilds/GuildHomepage';

const ParentContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const HomepageContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin: 10%;

    h1,
    span {
        text-align: center;
    }

    h1 {
        font-size: 36px;
    }

    span {
        font-size: 1.2em;
    }
`;

export default function ChatApp() {
    const api = window.app.api;

    return (
        <ParentContainer>
            <GuildSelect />
            <Routes>
                <Route path='guilds/:guildId' element={<GuildHomepage />} />
                <Route path='*' element={
                    <HomepageContainer>
                        <h1>Welcome, {api.user!.name}!</h1>
                        <span>You are currently in {api.guilds!.length} guilds.</span>
                    </HomepageContainer>
                } />
            </Routes>
        </ParentContainer>
    )
}
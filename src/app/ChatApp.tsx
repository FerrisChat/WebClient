import React from 'react';
import { Route, Routes } from 'react-router';
import styled from 'styled-components';

import ChannelSidebar from '../components/channels/ChannelSidebar';
import Chat from '../components/messaging/Chat';

import GuildSelect from '../components/guilds/GuildSelect';
import GuildHomepage from '../pages/guilds/GuildHomepage';

import Homepage from '../pages/home/Homepage';
import HomepageSidebar from '../pages/home/HomepageSidebar'

import UserInfo from '../components/app/UserInfo';

const ParentContainer = styled.div`
    display: grid;
    height: 100vh;
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
`;

const LeftGroup = styled.div`
    display: flex;
    overflow: hidden;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.tertiary};
    width: clamp(220px, 25vw, 260px);

    .content {
        display: flex;
        flex-grow: 1;
    }
`;

export default function ChatApp() {
    return (
        <ParentContainer>
            <LeftGroup>
                <GuildSelect />
                <Sidebar>
                    <div className='content'>
                        <Routes>
                            <Route path='guilds/:guildId/:channelId' element={<ChannelSidebar />} />
                            <Route path='guilds/:guildId/*' element={<ChannelSidebar />} />
                            <Route path='*' element={<HomepageSidebar />} />
                        </Routes>
                    </div>
                    <UserInfo />
                </Sidebar>
            </LeftGroup>
            <Routes>
                <Route path='guilds/:guildId/:channelId' element={<Chat />} />
                <Route path='guilds/:guildId' element={<GuildHomepage />} />
                <Route path='*' element={<Homepage />} />
            </Routes>
        </ParentContainer>
    )
}
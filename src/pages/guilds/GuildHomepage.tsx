import React from 'react';
import { useNavigate, useParams } from 'react-router';

import { HomepageContainer } from '../../app/ChatApp';

export default function GuildHomepage() {
    const { guildId } = useParams();
    const guild = window.app.api.guilds!.find(({ id_string }) => id_string == guildId);

    if (!guild) {
        useNavigate()('/');
        throw new Error('Could not find this guild. Maybe the cache was not loaded properly?')
    }

    return (
        <HomepageContainer>
            <h1>Welcome to {guild.name}!</h1>
            <span>Abcdefg, hijklmnop! Q</span>
        </HomepageContainer>
    )
}
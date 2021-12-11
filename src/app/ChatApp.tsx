import Cookies from 'js-cookie';
import React from 'react';
import { Route, Routes } from 'react-router';

import GuildSelect from '../components/guilds/GuildSelect';

export default function ChatApp() {
    return (
        <GuildSelect />
    )
}
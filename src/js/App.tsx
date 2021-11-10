import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import API from './api/API';
import Home from './pages/Home';
import GuildHomepage from './pages/GuildHomepage';

type P = { api: API }

export default class App extends React.Component<P, {}> {
    constructor(props: P) {
        super(props);
        window.api = props.api;
        window._resolver(props.api);
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/channels/:guildId' element={<GuildHomepage />} />
                    <Route path='*' element={<Navigate to='/home' />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import API from './api/API';

import Home from './pages/Home';
import ChatView from './pages/ChatView';
import GuildHomepage from './pages/GuildHomepage';

import AccountSettings from './pages/settings/Account';

type P = { api: API }

export default class App extends React.Component<P, { contextMenu?: Element }> {
    constructor(props: P) {
        super(props);
        window.api = props.api;
        window._resolver(props.api);
        window.appSetState = this.setState.bind(this);

        // This current context menu implementation is terrible,
        // It will probably be improved in a rewrite
        document.addEventListener("click", () => this.setState({ contextMenu: undefined }));
        this.state = { contextMenu: undefined };
    }

    render() {
        return (
            <>
                {this.state.contextMenu}
                <BrowserRouter>
                    <Routes>
                        <Route path='/home' element={<Home />} />
                        <Route path='/channels/:guildId/:channelId' element={<ChatView />} />
                        <Route path='/channels/:guildId' element={<GuildHomepage />} />
                        <Route path='/settings/account' element={<AccountSettings />} />
                        <Route path='/settings/*' element={<Navigate to='/settings/account' />} />
                        <Route path='*' element={<Navigate to='/home' />} />
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}
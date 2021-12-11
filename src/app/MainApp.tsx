import Cookies from 'js-cookie';
import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';

import ChatApp from './ChatApp';

function $MainApp() {
    return (
        <Routes>
            <Route path='*' element={<ChatApp />} />
        </Routes>
    )
}

const MainApp = lazy(
    async () => {
        let token;
        if (!window.app.api.token && (token = Cookies.get('token')))
            await window.app.api.loginWithToken(token);

        // we take this async advantage in order to reliably connect to the ws
        try {
            await window.app.api!.wsConnect()
        }
        catch (err) {
            return {
                default: () => (
                    <div>
                        Error while connecting to the websocket: <code>{(err as Error).message}</code>
                        <br />
                        <br />
                        Reloading this page may fix the error. If the error persists, try clearing your cookies and try again.
                        <br />
                        If all else fails, the servers at FerrisChat may be down.
                    </div> 
                ),
            }  // TODO: Better error page?
        }
        return { default: $MainApp }
    }
);

export default MainApp;
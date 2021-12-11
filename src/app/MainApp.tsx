import Cookies from 'js-cookie';
import React, { lazy } from 'react';

function $MainApp() {
    return (
        <p>hey {window.app.api.user!.name}</p>
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
                    <p>err while connecting to ws: <code>{(err as Error).message}</code>; please reload the page</p>
                ),
            }  // TODO: Better error page?
        }
        return { default: $MainApp }
    }
);

export default MainApp;
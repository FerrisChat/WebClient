import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import API from './api/API';

declare global {
    interface Window {
        api?: API;
        waitForAPI(): Promise<API>;
        showLoading(): void;
        _apiPromise: Promise<API>;
        _resolver: Function;
    }
}

window._apiPromise = new Promise(r => window._resolver = r);
window.waitForAPI = async () => {
    return await window._apiPromise;
}

window.showLoading = () => {
    ReactDOM.render(
        <div className='loading-screen'>
            <img src='https://ferris.chat/assets/img/rustacean-orig-noshadow.svg?h=fbe685f59b2d99b250e541ff3f5d6388' alt='Ferris' />
            <h2>Loading...</h2>
        </div>,
        document.getElementById('app'),
    )
}

const MESSAGE = 
    "Don't paste anything into this console without knowing "
    + "what you're doing first. Your account could get compromised!";

console.log('%c' + MESSAGE, 'font-size:23px;');

const path = window.location.pathname.replace(/\/+$/g, '');
let element;

if ((path === '/' || !window.api?.token) && ! ['/login', '/register'].includes(path)) {
    window.location.pathname = '/login';  // TODO: Cookies
}

if (path === '/login')
    element = <LoginForm />;
else if (path === '/register')
    element = <RegisterForm />;
else {
    throw new Error('page unimplemented')
}

ReactDOM.render(
    // <Chat channelId="12345" messages={messages} />,
    element,
    document.getElementById('app'),
);

import W from './api/requests/WebSocketClient';
// @ts-ignore
window.WSC = W;  // ws console testing

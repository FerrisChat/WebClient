import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
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
            <img src='./assets/ferris.png' alt='Ferris' />
            <h2>Loading...</h2>
        </div>,
        document.getElementById('app'),
    )
}

const MESSAGE = 
    "Don't paste anything into this console without knowing "
    + "what you're doing first. Your account could get compromised!";

console.log('%c' + MESSAGE, 'font-size:23px;');

const loggedIn = window.api?.token;
const defaultElement = loggedIn ? undefined : <LoginForm />;

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/home' element={defaultElement} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='*' element={defaultElement} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('app'),
);

import W from './api/requests/WebSocketClient';
// @ts-ignore
window.WSC = W;  // ws console testing

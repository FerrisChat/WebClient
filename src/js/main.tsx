import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import API from './api/API';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import App from './App';

declare global {
    interface Window {
        api?: API;
        waitForAPI(): Promise<API>;
        showLoading(): void;
        startApp(): void;
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

window.startApp = () => {
    window.showLoading();
    window.waitForAPI().then(
        api => api.waitForReady().then(
            api => ReactDOM.render(
                <App api={api} />,
                document.getElementById('app'),
            )
        )
    )
}

const MESSAGE = 
    "Don't paste anything into this console without knowing "
    + "what you're doing first. Your account could get compromised!";

console.log('%c' + MESSAGE, 'font-size:23px;');

const defaultElement = window.api?.token ? <App api={window.api!} /> : <Navigate to={'/login'} />;

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='*' element={defaultElement} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('app'),
);
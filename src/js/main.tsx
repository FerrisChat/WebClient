import Cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import API from './api/API';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

import App from './App';
import ThemeManager from './ThemeManager';
import ferrisImage from './assets/ferris.png';

Modal.setAppElement('#app');

window.themeManager = new ThemeManager();

window._apiPromise = new Promise(r => window._resolver = r);
window.waitForAPI = async () => {
    return await window._apiPromise;
}

window.showLoading = () => {
    ReactDOM.render(
        <div className='loading-screen'>
            <img src={ferrisImage} alt='Ferris' />
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

const token = Cookies.get('token');
if (token) {
    window.startApp();
    window.api = API.fromToken(token);
} else {
    ReactDOM.render(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='*' element={<Navigate to={'/login'} />} />
            </Routes>
        </BrowserRouter>,
        document.getElementById('app'),
    );
}
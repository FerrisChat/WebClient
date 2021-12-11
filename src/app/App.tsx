/**
 * App.tsx: Entire app including login pages
 * > MainApp.tsx: Authenticated app in which is the actual client
 *   > ChatApp.tsx: The part of the main app which has a common layout; 
 *     entire main app excluding settings
 * 
 * These are separate in order to independently route their
 * component-specific routes
 */

import Cookies from 'js-cookie';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainApp from './MainApp';
import Theme from '../core/theming/Theme';
import Title from '../components/util/Title';
import LoadingScreen from '../pages/LoadingScreen';

const Login = lazy(() => import('../pages/login/Login'))

const LoginOrApp = () => Cookies.get('token')
    ? <Navigate to='/' />
    : <Login />;

const AppOrLogin = () => Cookies.get('token')
    ? <MainApp />
    : <Navigate to='/login' />;

export default function App() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Title>FerrisChat</Title>
            <Theme>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*">
                            <Route path='$/*'>
                                { /* "$" Routes are meta routes for testing. */ }
                                <Route index element={<p>Hello world</p>} /> 
                                <Route path='loading-screen' element={<LoadingScreen />} />
                                <Route path='*' element={<p>404 Meta page not found</p>} />
                            </Route>
                            <Route path='login/*' element={<LoginOrApp />} />
                            <Route path='*' element={<AppOrLogin />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Theme>
        </Suspense>
    )
}
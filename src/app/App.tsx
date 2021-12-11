import Cookies from 'js-cookie';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainApp from './MainApp';
import Theme from '../core/theming/Theme';
import Title from '../components/util/Title';
import LoadingScreen from '../pages/LoadingScreen';

export const Lazy = ({ path, ...props }: { path: string }) => {
    const Element = lazy(() => import(/* @vite-ignore */ path));
    return <Element {...props}/>;
};

const LoginOrApp = () => Cookies.get('token')
    ? <Navigate to='/' />
    : <Lazy path='../pages/login/Login' />;

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
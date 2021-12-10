import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Theme from '../core/Theme';
import Title from '../components/util/Title';
import LoadingScreen from '../pages/LoadingScreen';

export default function App() {
    const LoadApp = lazy(() => import('./MainApp'));
    const LoadLogin = lazy(() => import('../pages/login/Login'));  // TODO

    return (
        <Suspense fallback={<LoadingScreen />}>
            <Title>FerrisChat</Title>
            <Theme>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login/*' element={<LoadLogin />} />
                        <Route path='*' element={<LoadApp />} />
                    </Routes>
                </BrowserRouter>
            </Theme>
        </Suspense>
    )
}
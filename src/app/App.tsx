import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingScreen from '../pages/LoadingScreen';

export default function App() {
    const LoadApp = lazy(() => import('./MainApp'));
    const LoadLogin = lazy(() => import('./MainApp'));  // TODO

    return (
        <Suspense fallback={<LoadingScreen />}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoadLogin />} />
                    <Route path='*' element={<LoadApp />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}
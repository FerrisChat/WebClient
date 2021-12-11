import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import FerrisChatLogo from '../../components/branding/FerrisChatLogo';
import banner from '../../assets/banners/ferris_plushy.jpg';

const Container = styled.div`
    background-image: url(${banner});
    background-size: cover;
    height: 100%;
`;

const LoginForm = lazy(() => import('./LoginForm'))
const RegisterForm = lazy(() => import('./RegisterForm'))

export default function Login() {
    return (
        <Container>
            <FerrisChatLogo />
            <Routes>
                <Route path="create" element={<LoginForm />} />
                <Route path="*" element={<RegisterForm />} />
            </Routes>
        </Container>
    )
}
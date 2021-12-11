import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Lazy } from '../../app/App';
import FerrisChatLogo from '../../components/branding/FerrisChatLogo';

import banner from '../../assets/banners/ferris_plushy.jpg';

const Container = styled.div`
    background-image: url(${banner});
    background-size: cover;
    height: 100%;
`;

export default function Login() {
    return (
        <Container>
            <FerrisChatLogo />
            <Routes>
                <Route path="create" element={<Lazy path='../pages/login/RegisterForm' />} />
                <Route path="*" element={<Lazy path='../pages/login/LoginForm' />} />
            </Routes>
        </Container>
    )
}
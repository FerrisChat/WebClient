import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from './LoginForm';
import FerrisChatLogo from '../../components/branding/FerrisChatLogo';

import banner from '../../assets/banners/ferris-plushy.jpg';

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
                <Route path="*" element={<LoginForm />} />
            </Routes>
        </Container>
    )
}
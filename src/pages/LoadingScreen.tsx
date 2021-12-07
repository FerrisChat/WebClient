import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
`;

const Ferris = styled.img`
    width: 40%;
    min-width: 150px;
    max-width: 250px;
    animation: ${keyframes`
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(720deg);
        }
        100% {
            transform: rotate(0deg);
        }
    `} 7s infinite;
`;

const Text = styled.h2`
    text-align: center;
    font-size: 40px;
    opacity: 0.5;
    padding-top: 10vh;
    animation: ${keyframes`
        0% {
            opacity: 0.2
        }
        50% {
            opacity: 0.5
        }
        100% {
            opacity: 0.2
        }
    `} 3s infinite;
`;

export default function LoadingScreen() {
    return (
        <Container>
            <Ferris />
            <Text>Loading...</Text>
        </Container>
    )
}
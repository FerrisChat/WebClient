import React from 'react';
import styled from 'styled-components';

export const HomepageContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin: 10%;

    h1,
    span {
        text-align: center;
    }

    h1 {
        font-size: 36px;
    }

    span {
        font-size: 1.2em;
    }
`;

export default function Homepage() {
    const { api } = window.app

    return (
        <HomepageContainer>
            <h1>Welcome, {api.user!.name}!</h1>
            <span>You are currently in {api.guilds!.length} guilds.</span>
        </HomepageContainer>
    )
}
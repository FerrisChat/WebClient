import React from 'react';
import styled from 'styled-components';

import MessageView from './MessageView';
import MessageInput from './MessageInput';

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export default function Chat() {
    return (
        <Container>
            <MessageView />
            <MessageInput />
        </Container>
    )
}
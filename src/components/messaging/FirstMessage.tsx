import React from 'react';
import styled from 'styled-components';

import { Container, Content } from './Message';

import type { Message } from '../../types/objects';
import defaultAvatar from '../../assets/icons/avatar_default.png';

export interface MessageProps {
    message: Message;
    pending?: boolean;
    error?: boolean;
}

const FirstMessageContainer = styled(Container)`
    margin-top: 16px;

    & > img {
        width: 42px;
        height: 42px;
        position: absolute;
        border-radius: 50%;
        margin-left: 24px;
        margin-top: 4px;
    }
`;

const Heading = styled.div`
    padding-left: 80px;
    margin-top: 2px;
    margin-bottom: 4px;

    span:nth-child(1) {
        font-weight: 600;
        font-size: 1.1em;
    }

    span:nth-child(2) {
        opacity: 0.6;
        margin-left: 8px;
        font-size: 0.9em;
    }
`;

export default function FirstMessage({ message }: MessageProps) {
    const { author } = message;

    return (
        <FirstMessageContainer>
            <img src={author.avatar || defaultAvatar} className='unselectable' />
            <Heading>
                <span>{author.name}</span>
                <span>Today at 5:00 PM</span>
            </Heading>
            <Content>
                {message.content}
            </Content>
        </FirstMessageContainer>
    )
}
import React from 'react';
import styled from 'styled-components';

import { parseCSSColor } from '../../utils';
import type { MessageProps } from './FirstMessage';

export const Container = styled.div`
    padding: 2px 0;
    transition: background-color 0.3s ease;

    & .timestamp {
        transition: all 0.3s ease;
    }

    &:hover {
        background-color: ${props => parseCSSColor(props.theme.tertiary, 0.5).rgba};
    }

    &:hover .timestamp {
        color: ${props => props.theme.text};
        opacity: 0.4;
    }
`;

export const Content = styled.div<{ pending?: boolean, error?: boolean }>`
    padding-left: 80px;
    font-size: 1em;
    
    opacity: ${props => props.pending && 0.6};
    color: ${props => props.error && props.theme.error};

    b {
        font-weight: 700;
    }
`;

export const Timestamp = styled.span`
    position: absolute;
    font-size: 0.75em;
    padding-top: 0.275em;
    width: 80px;
    text-align: center;
    color: ${props => props.theme.secondary};
`;

export default function Message({ message }: MessageProps) {
    return (
        <Container>
            <Timestamp className='timestamp unselectable'>
                8:05 PM
            </Timestamp>
            <Content>
                {message.content}
            </Content>
        </Container>
    )
}
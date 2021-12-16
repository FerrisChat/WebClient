import React from 'react';
import styled from 'styled-components';

import { parseCSSColor, parseSnowflake } from '../../utils';
import type { MessageProps } from './FirstMessage';

export const Container = styled.div`
    padding: 2px 0;
    position: relative;
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
    padding-right: 10px;
    font-size: 1em;
    overflow: hidden;
    text-wrap: break-word;
    word-break: break-word;

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
                {parseSnowflake(message.id_string).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                })}
            </Timestamp>
            <Content>
                {message.content}
            </Content>
        </Container>
    )
}
import React, { KeyboardEvent } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { generateSnowflake } from '../../utils';

const Container = styled.div`
    display: flex;
    cursor: text;
    background-color: ${props => props.theme.primary};

    [placeholder]:empty::before,
    [placeholder]:empty:focus::before {
        content: attr(placeholder);
        opacity: 0.3; 
    }
`;

const Area = styled.div`
    font-size: 0.95em;
    padding: 16px;
    flex-grow: 1;
    outline: none;
    white-space: pre-wrap; 
    max-height: 200px;
    overflow-y: auto;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -webkit-user-modify: read-write-plaintext-only;
`;

export default function MessageInput() {
    const { channelId } = useParams()

    return (
        <Container                
            // @ts-ignore (contentEditable was set to true so this event is valid)
            onKeyPress={
                (event: KeyboardEvent) => {
                    if (event.shiftKey || event.key !== 'Enter') return;

                    event.preventDefault();
                    const { api } = window.app;

                    // @ts-ignore
                    const content = event.target.innerText.trim();
                    if (!content) return;

                    const nonce = generateSnowflake().toString();
                    const fakeMessage = {
                        id: 0,
                        id_string: nonce,
                        author_id: 0,
                        author_id_string: api.user!.id_string,
                        author: api.user!,
                        channel_id: 0,
                        channel_id_string: channelId!,
                        content,
                    }

                    api.ws?.boundMessageManager?.lazilyAddMessage(
                        fakeMessage, { pending: true }
                    )
                }
            }
        >
            <Area
                contentEditable='true' 
                placeholder='Send a message...' 
                spellCheck='false'
            />   
        </Container>
    )
}
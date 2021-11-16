import React from 'react';
import mdit from 'markdown-it';
import DOMPurify from 'dompurify';

import MessageContextMenu from './context-menus/MessageContextMenu';
import { MessageData } from '../types'; 

const md = mdit({ linkify: true, breaks: true });
md.renderer.rules.strong_open = md.renderer.rules.strong_close = (tokens, index, options, _, self) => {
    let token = tokens[index];
    if (token.markup === '__') {
        token.tag = 'u';
    }
    return self.renderToken(tokens, index, options);
}

interface MessageProps {
    id: string;
    message: MessageData;
}

export default function Message({ id, message }: MessageProps) {
    return (
        <div 
            className={`message ${message.__status__}`} 
            data-message-id={id} 
            // @ts-ignore
            onContextMenu={e => {
                window.appSetState({ contextMenu: (
                    <MessageContextMenu message={message} coordinates={[
                        e.pageX, e.pageY,
                    ]} />
                ) });
                e.preventDefault();
            }}
        >
            <span className='message-content' dangerouslySetInnerHTML={
                { __html: DOMPurify.sanitize(md.renderInline(message.content)) }
            } />
        </div>
    )
}
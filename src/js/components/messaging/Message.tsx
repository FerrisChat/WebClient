import React from 'react';

import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import mdit from 'markdown-it';
import mditHighlightJS from 'markdown-it-highlightjs';

import MessageContextMenu from '../context-menus/MessageContextMenu';
import { MessageData } from '../../types'; 

const md = mdit({ linkify: true, breaks: true })
    .use(mditHighlightJS, {
        auto: true,
        code: true,
        inline: true,
        hljs,
    });

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
                { __html: DOMPurify.sanitize(md.render(message.content)) }
            } />
        </div>
    )
}
import React from 'react';
import DOMPurify from 'dompurify';

import md from '../../markdown';
import MessageContextMenu from '../context-menus/MessageContextMenu';
import { MessageData } from '../../types'; 

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
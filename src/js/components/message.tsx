import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { parseSnowflake } from '../utils';

interface MessageProps {
    id: string | bigint,
    content: string,
    author: {
        id?: string | bigint,
        name: string,
        avatarUrl: string,
    },
}

function isSameDay(date: Date, now: Date): boolean {
    return (
        date.getDate() === now.getDate()
        && date.getMonth() === now.getMonth()
        && date.getFullYear() === now.getFullYear()
    )
}

export default function Message({ id, content, author }: MessageProps) {
    const date = parseSnowflake(id);
    const now = new Date(Date.now());

    let day;
    if (isSameDay(date, now)) {
        day = 'Today'
    } else if (isSameDay(date, new Date(Date.now() - 86400))) {
        day = 'Yesterday'
    } else {
        day = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });  // TODO: Support for customizable locales
    }

    const timestamp = day + ` at ${date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })}`

    return (
        <div className='message-container' id={`message__${id}`}>
            <div className='message-avatar'>
            {author.avatarUrl ? (
                <img src={author.avatarUrl} />
            ) : undefined}  
            </div>
            <div className='message-display'>
                <div className='message-heading'>
                    <span className='message-author'>{author.name}</span>
                    <span className='message-timestamp'>{timestamp}</span>
                </div>
                <div className='message-content' dangerouslySetInnerHTML={
        	        { __html: DOMPurify.sanitize(marked.parseInline(content.replace(/ {0,1}\n/g, "  \n"))) }
                } />
            </div>
  	    </div>
    )
}
import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { parseSnowflake, humanizeDate } from '../utils';

interface MessageProps {
    id: string | bigint,
    content: string,
    author: {
        id?: string | bigint,
        name: string,
        avatarUrl: string,
    },
}

export default function Message({ id, content, author }: MessageProps) {
    const timestamp = humanizeDate(parseSnowflake(id));

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
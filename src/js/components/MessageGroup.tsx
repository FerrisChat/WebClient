import React from 'react';
import { MessageGroupProps } from '../types';
import { parseSnowflake, humanizeDate } from '../utils';

export default function MessageGroup({ author, children }: MessageGroupProps) {
    if (children.length < 1)
        throw new TypeError('message group must contain at least on message');

    const timestamp = humanizeDate(parseSnowflake(children[0].props.id))
    return (
        <div class='message-container' data-author-id={author.id}>
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
                {children}
            </div>
        </div>
    )
}
import React from 'react';
import { UserData } from '../../types';
import { parseSnowflake, humanizeDate } from '../../utils';

type MessageElement = { props: { id: string, name: string } };

interface MessageGroupProps {
    author: UserData;
    children: MessageElement | MessageElement[],
}

export default function MessageGroup({ author, children }: MessageGroupProps) {
    if (!(children instanceof Array))
        children = [children];

    if (children.length < 1)
        throw new TypeError('message group must contain at least one message');

    const timestamp = humanizeDate(parseSnowflake(children[0].props.id))
    return (
        <div className='message-container' data-author-id={author.id_string}>
            <div className='message-avatar'>
                {author.avatar ? (
                    <img src={author.avatar} />
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
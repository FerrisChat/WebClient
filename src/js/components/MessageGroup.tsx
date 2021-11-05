import React from 'react';
import { MessageGroupProps } from '../types';


export default function MessageGroup({ author, children }: MessageGroupProps) {
    alert(children)
    return (
        <div class='message-container' data-author-id={author.id}>
            
        </div>
    )
}
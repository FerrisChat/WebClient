import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { MessageProps } from '../types';

export default function Message({ id, content }: MessageProps) {
    return (
        <div className='message' data-message-id={id}>
            <span className='message-content' dangerouslySetInnerHTML={
                { __html: DOMPurify.sanitize(marked.parseInline(content.replace(/ {0,1}\n/g, "  \n"))) }
            } />
        </div>
    )
}
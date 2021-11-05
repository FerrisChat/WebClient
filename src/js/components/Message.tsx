import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { parseSnowflake, humanizeDate } from '../utils';
import { MessageProps } from '../types';

export default function Message({ id, content }: MessageProps) {
    return (
        <div className='message-content' data-message-id={id} dangerouslySetInnerHTML={
        	{ __html: DOMPurify.sanitize(marked.parseInline(content.replace(/ {0,1}\n/g, "  \n"))) }
        } />
    )
}
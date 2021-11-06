import React from 'react';
import mdit from 'markdown-it';
import DOMPurify from 'dompurify';
import { MessageProps } from '../types';

const md = mdit({ linkify: true });
md.renderer.rules.strong_open = md.renderer.rules.strong_close = (tokens, index, options, _, self) => {
    let token = tokens[index];
    if (token.markup === '__') {
        token.tag = 'u';
    }
    return self.renderToken(tokens, index, options);
}

export default function Message({ id, content }: MessageProps) {
    return (
        <div className='message' data-message-id={id}>
            <span className='message-content' dangerouslySetInnerHTML={
                { __html: DOMPurify.sanitize(md.renderInline(content.replace(/ {0,1}\n/g, "  \n"))) }
            } />
        </div>
    )
}
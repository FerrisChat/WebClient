import React from 'react';
import mdit from 'markdown-it';
import DOMPurify from 'dompurify';

const md = mdit({ linkify: true, breaks: true });
md.renderer.rules.strong_open = md.renderer.rules.strong_close = (tokens, index, options, _, self) => {
    let token = tokens[index];
    if (token.markup === '__') {
        token.tag = 'u';
    }
    return self.renderToken(tokens, index, options);
}

interface MessageProps {
    id: string ;
    content: string;
    status?: string;
}

export default function Message({ id, content, status }: MessageProps) {
    return (
        <div className={`message ${status}`} data-message-id={id}>
            <span className='message-content' dangerouslySetInnerHTML={
                { __html: DOMPurify.sanitize(md.renderInline(content)) }
            } />
        </div>
    )
}
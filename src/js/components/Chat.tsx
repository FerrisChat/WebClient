import React from 'react';
import Message from './Message';
import MessageGroup from './MessageGroup';
import { decodeHTML, generateSnowflake } from '../utils';
import { MessageData } from '../types';

function processMessages(messages: MessageData[]): any[] {
    if (!messages.length)
        return [];

    let buffer, element;
    let current: any[] = [];
    let processed = [];
  
    for (const message of messages) {
        element = <Message id={message.id} content={message.content} key={message.id as string} />;
    
        if (!buffer?.id || message.author.id === buffer.id) 
            current.push(element);
        else {
            processed.push(
                <MessageGroup author={buffer} key={current[0].props.id + ":" + current.length}>{current}</MessageGroup>
            );
            current = [element];
        }
        buffer = message.author
    }
  
    processed.push(
        // @ts-ignore
        <MessageGroup author={buffer} key={current[0].props.id + ":" + current.length}>{current}</MessageGroup>
    );
    return processed
}

type P = { channelId: string, messages?: MessageData[] };

export default class Chat extends React.Component<P, { messages: MessageData[] }> {
    constructor(props: P) {
        super(props);
        this.state = {
            messages: props.messages || [],
        };

        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(event: KeyboardEvent) {
        if (event.shiftKey) return;
        if (event.key === 'Enter') {
            event.preventDefault();

            let textarea = document.getElementById('chat-input-textarea')!;
            const content = decodeHTML(textarea.innerHTML).trim();
            if (!content) return;

            this.state.messages.push({
                author: {
                    id: '1',
                    name: 'pee',
                    avatarUrl: 'https://cdn.discordapp.com/emojis/596576798351949847.png',
                },
                id: generateSnowflake().toString(),
                content,
            });
            this.forceUpdate();
            textarea.innerHTML = '';
        }
    }

    render() {
        return (
            <div id='chat'>
                <div className='chat-items'>
                    <div className='chat-messages'>
                        {processMessages(this.state.messages)}
                    </div>
                    <div className='chat-input-container'>
                        <div className='chat-input'>
                            <div
                                id='chat-input-textarea' 
                                contentEditable='true' 
                                placeholder='Send a message...' 
                                spellCheck='false'
                                // @ts-ignore
                                onKeyPress={this.onKeyPress}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
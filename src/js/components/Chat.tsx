import React from 'react';
import Message from './Message';
import MessageGroup from './MessageGroup';
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

export default class Chat<P = { channelId: string }> extends React.Component<P, { messages: MessageData[] }> {
    constructor(props: P) {
        super(props);
        this.state = {
            messages: [],
        }
    }

    render() {
        return (
            <div className='chat'>
                <div className='chat-messages'>
                    {processMessages(this.state.messages)}
                </div>
                <div className='chat-input-box'>
                    {/* TODO */}
                </div>
            </div>
        )
    }
}
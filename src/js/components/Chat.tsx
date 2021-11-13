import React from 'react';
import Message from './Message';
import MessageGroup from './MessageGroup';
import { decodeHTML } from '../utils';
import { MessageData } from '../types';
import defaultAvatar from '../assets/avatar_default.png';

function processMessages(messages: MessageData[]): any[] {
    if (!messages.length)
        return [];

    let buffer, element;
    let current: any[] = [];
    let processed = [];

    for (const message of messages) {
        element = <Message id={message.id_string} content={message.content} key={message.id_string} />;
    
        if (!buffer?.id_string || message.author_id_string === buffer.id_string) 
            current.push(element);
        else {
            processed.push(
                <MessageGroup author={buffer} key={current[0].props.id_string + ":" + current.length}>{current}</MessageGroup>
            );
            current = [element];
        }
        buffer = message.author
    }
  
    processed.push(
        // @ts-ignore
        <MessageGroup author={buffer} key={current[0].props.id_string + ":" + current.length}>{current}</MessageGroup>
    );
    return processed
}

type P = { channelId: string };

export default class Chat extends React.Component<P, { _: MessageData[] }> {
    constructor(props: P) {
        super(props);
        this.messages.push = (...args): any => {
            Array.prototype.push.apply(this.messages, args);
            this.forceUpdate();
        }
        this.state = { _: this.messages };
        this.onKeyPress = this.onKeyPress.bind(this);

        if (!window.api!.loadedChannels.includes(this.props.channelId)) 
            this.loadHistory();
    }

    get messages(): MessageData[] {
        if (!window.api!.messages.has(this.props.channelId))
            window.api!.messages.set(this.props.channelId, []);

        return window.api!.messages.get(this.props.channelId)!
    }

    async loadHistory(limit: number = 200) {
        const response = await window.api!.rest!.request('GET', `/channels/${this.props.channelId}/messages`, { params: { limit } });
        window.api!.loadedChannels.push(this.props.channelId);
        this.messages.splice(0, 0, ...response.messages.reverse().map(
            (msg: MessageData) => {
                // TODO: remove this when author field becomes available
                return {
                    ...msg,
                    author: {
                        id: msg.author_id,
                        id_string: msg.author_id_string,
                        name: "Unknown User",
                        avatar: defaultAvatar,
                        discriminator: 0,
                    }
                }
            }
        ));
        this.forceUpdate();
    }

    onKeyPress(event: KeyboardEvent) {
        if (event.shiftKey) return;
        if (event.key === 'Enter') {
            event.preventDefault();

            let textarea = document.getElementById('chat-input-textarea')!;
            const content = decodeHTML(textarea.innerHTML).trim();
            if (!content) return;

            // TODO: nonce

            window.api!.rest!.request('POST', `/channels/${this.props.channelId}/messages`, { json: { content } });
            textarea.innerHTML = '';
        }
    }

    render() {
        return (
            <div id='chat'>
                <div className='chat-items'>
                    <div className='chat-messages'>
                        {processMessages(this.state._)}
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
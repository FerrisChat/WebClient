import React from 'react';
import Message from './Message';
import MessageGroup from './MessageGroup';
import { decodeHTML, generateSnowflake } from '../utils';
import { MessageData } from '../types';
import defaultAvatar from '../assets/avatar_default.png';

// 16602069666338596454400000n is the snowflake diff for 15 minutes
const MAX_SNOWFLAKE_DIFF = BigInt('16602069666338596454400000')  // bigint literals not allowed on some browsers

function processMessages(messages: MessageData[]): any[] {
    messages = messages.sort((a: MessageData, b: MessageData): number => {
        return BigInt(a.id_string) - BigInt(b.id_string) > 0 ? 1 : -1;
    })

    if (!messages.length)
        return [];

    let buffer, element;
    let current: any[] = [];
    let processed = [];

    for (const message of messages) {
        element = <Message id={message.id_string} content={message.content} key={message.id_string} status={message.__status__} />;

        if (!buffer?.author_id_string || (
            message.author_id_string === buffer.author_id_string
            && BigInt(message.id_string) - BigInt(buffer.id_string) < MAX_SNOWFLAKE_DIFF
        ))
            current.push(element);
        else {
            processed.push(
                <MessageGroup author={buffer.author} key={current[0].props.id + ":" + current.length}>{current}</MessageGroup>
            );
            current = [element];
        }
        buffer = message
    }
  
    processed.push(
        // @ts-ignore
        <MessageGroup author={buffer.author} key={current[0].props.id + ":" + current.length}>{current}</MessageGroup>
    );
    return processed.reverse()
}

type P = { channelId: string };

export default class Chat extends React.Component<P, { _: MessageData[] }> {
    constructor(props: P) {
        super(props);
        window.updateChat = this.forceUpdate.bind(this);

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
        const params = { limit, oldest_first: false };
        const response = await window.api!.rest!.request('GET', `/channels/${this.props.channelId}/messages`, { params });
        window.api!.loadedChannels.push(this.props.channelId);
        this.messages.splice(0, 0, ...response.messages.map(
            (msg: MessageData) => {
                // TODO: remove this when author field becomes available
                return {
                    ...msg,
                    author: {
                        id: msg.author_id,
                        id_string: msg.author_id_string,
                        name: `Unknown User (id: ${msg.author_id_string})`,
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

            const snowflake = generateSnowflake().toString();
            const psuedoMessage: MessageData = {
                id: 0,
                id_string: snowflake,
                author_id: 0,
                author_id_string: window.api?.userId!,
                author: window.api?.user!,
                channel_id: 0,
                channel_id_string: this.props.channelId,
                content,
                __status__: 'pending',
            }

            this.messages.push(psuedoMessage);
            window.api!.nonces.set(snowflake, psuedoMessage);
            this.forceUpdate();

            window.api!.rest!.request('POST', `/channels/${this.props.channelId}/messages`, { json: { content, nonce: snowflake } })
                .catch(_ => {
                    psuedoMessage.__status__ = 'error';
                    window.updateChat()
                });
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
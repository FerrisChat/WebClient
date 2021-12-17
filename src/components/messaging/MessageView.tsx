import React, { UIEventHandler, useEffect, useState } from "react";
import { useParams } from 'react-router';
import styled from 'styled-components';

import MessageComponent from './Message';
import FirstMessage, { MessageProps } from './FirstMessage';

import { isSameDay, generateSnowflake, parseSnowflake } from "../../utils";
import type { Message } from "../../types/objects";

// the snowflake difference for 15 minutes
export const SNOWFLAKE_THRESHOLD = BigInt('16602069666338596454400000')  // bigint literals not allowed on some browsers

export type ArrayOfChildren = Children & Array<Child | Children>;

export class MessageManager<T extends (children?: ArrayOfChildren) => void = any> {
    private $keepLoading: boolean;
    private $historyOffset: number;

    channelId: string;
    children?: ArrayOfChildren;
    setChildren: T;

    messages: Message[];
    stored: Set<string>;
    buffer?: Message;

    constructor(channelId: string, children: ArrayOfChildren | undefined, setChildren: T) {
        this.channelId = channelId;
        this.children = children;
        this.setChildren = setChildren;

        const { loadedChannels, messages } = window.app.api
        this.messages = messages.get(channelId) ?? window.app.api.messages.set(channelId, []).get(channelId)!;
        
        this.$keepLoading = true;
        this.$historyOffset = 0;
        if (!loadedChannels.has(channelId)) this.loadHistory();
    
        this.stored = new Set();
        this.rerenderMessages();
    }

    $addChild(child: Child) {
        this.setChildren([ ...(this.children ?? []), child ])
    }

    onReceivedMessage(message: Message) {
        const id = message.id_string;
        if (this.stored.has(id)) 
            throw new Error('received two messages with idential IDs, this should never happen');

        this.stored.add(id);
        this.lazilyAddMessage(message);
    }

    onDeletedMessage(message: Message) {
        const id = message.id_string;
        this.stored.delete(id);

        this.setChildren(
            // @ts-ignore
            this.children?.filter(c => c?.props.message.id_string === id)
        )  // Thank you React for having an O(n) deletion
    }

    onScroll(event: any) {
        if (!this.$keepLoading) return;
        const scroll = event.currentTarget.scrollHeight + event.currentTarget.scrollTop - event.currentTarget.offsetHeight;

        if (scroll < 10) {
            this.$historyOffset += 200;
            this.loadHistory(200, this.$historyOffset);
            this.rerenderMessages();
        }
    }

    makeElement(message: Message, props?: Partial<MessageProps>) {
        // Compare this message with the buffer.
        //
        // If the buffer is undefined, start a new group (obviously)
        // If the message has a different author, start a new group
        // If the message has a snowflake difference of 16602069666338596454400000n (15 minutes), start a new group
        // If the message was posted on a different day than the buffer, start a new group 
        // TODO: day dividers
        //
        // Then, set the buffer to this message
        
        let Element = (
            !this.buffer
            || this.buffer.author_id_string !== message.author_id_string
            || BigInt(message.id_string) - BigInt(this.buffer.id_string) > SNOWFLAKE_THRESHOLD
            || !isSameDay(parseSnowflake(message.id_string), parseSnowflake(this.buffer.id_string))
        ) ? FirstMessage : MessageComponent;

        this.buffer = message;
        return <Element {...props} message={message} key={message.id_string} />
    }

    lazilyAddMessage(message: Message, props?: Partial<MessageProps>) {
        this.$addChild(this.makeElement(message, props))
    }

    sortMessages(messages?: Message[]) {
        messages ??= this.messages;
        return messages.sort((a: Message, b: Message): number => {
            return BigInt(a.id_string) - BigInt(b.id_string) > 0 ? 1 : -1;
        })
    }

    removeDupes(messages: Message[]) {
        return messages.map(
            m => {
                if (this.stored.has(m.id_string)) return false;
                this.stored.add(m.id_string);
                return m
            }
        ).filter(m => m) as Message[]
    }

    rerenderMessages() {
        this.buffer = undefined;
        this.stored.clear();
        this.setChildren(
            this.removeDupes(this.sortMessages(this.messages)).map(o => this.makeElement(o))
        )
    }

    async loadHistory(limit: number = 200, offset: number = 0) { 
        const { loadedChannels, router } = window.app.api;
        const response = await router!.channels(this.channelId).messages.get.params({ limit, offset, oldest_first: false });

        loadedChannels.add(this.channelId);
        if (response.messages.length < limit)
            this.$keepLoading = false;

        this.messages.splice(0, 0, ...response.messages);
        this.rerenderMessages();
    }
}

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column-reverse;
    overflow-y: auto;
    padding-bottom: 18px;
`;

export default function MessageView() {
    const { channelId } = useParams();
    const [ children, setChildren ] = useState<ArrayOfChildren>();
    const [ manager, setManager ] = useState<MessageManager>();
    
    const { ws } = window.app.api;
    useEffect(() => {
        const manager = new MessageManager(channelId!, children, setChildren)
        setManager(manager);

        ws?.bindMessageManager(manager)
        return () => ws?.unbindMessageManager()
    }, [channelId])

    return (
        <Container onScroll={e => manager!.onScroll(e)}>
            {children?.reverse()}
        </Container>
    )
}
export interface MessageAuthorProps {
    id: string | bigint;
    name: string;
    avatarUrl: string;
}

type MessageElement = { props: MessageProps };

export interface MessageGroupProps {
    author: MessageAuthorProps;
    children: MessageElement | MessageElement[],
}

export interface MessageProps {
    id: string | bigint;
    content: string;
}

export interface MessageData {
    id: string | bigint;
    content: string;
    author: MessageAuthorProps;
}
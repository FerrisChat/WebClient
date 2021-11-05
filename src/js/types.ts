export interface MessageAuthorProps {
    id?: string | bigint;
    name: string;
    avatarUrl: string;
}

export interface MessageGroupProps {
    author: MessageAuthorProps;
    children: any[],
}

export interface MessageProps {
    id: string | bigint;
    content: string;
}
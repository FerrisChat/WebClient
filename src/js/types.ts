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

export interface UserData {
    id: number;
    id_string: string;
    name: string;
    avatar?: string | null;
    guilds?: any[] | null;
    flags: number;
    discriminator: number;
}

export interface ChannelData {
    id: number;
    id_string: string;
    name: string;
    guild_id: number;
    guild_id_string: string;
}

export interface MemberData {
    user_id: number;
    user?: UserData;
    guild_id: number;
    guild?: GuildData;
}

export interface GuildData {
    id: number;
    id_string: string;
    owner_id: number;
    owner_id_string: string;
    name: string;
    channels: ChannelData[];
    members: MemberData[];
}
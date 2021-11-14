export interface MessageData {
    id: number;
    id_string: string;
    content: string;
    author: UserData;
    author_id: number;
    author_id_string: string;
    channel_id: number;
    channel_id_string: string;
    edited_at?: null;
    embeds?: null | any[];
    nonce?: string | null;
    __status__?: 'pending' | 'error' | 'sent';
}

export interface UserData {
    id: number;
    id_string: string;
    name: string;
    avatar?: string | null;
    guilds?: any[] | null;
    flags?: number;
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
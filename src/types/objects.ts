export interface Message {
    id: number;
    id_string: string;
    content: string;
    author: User;
    author_id: number;
    author_id_string: string;
    channel_id: number;
    channel_id_string: string;
    edited_at?: null;
    embeds?: Embed[] | null;
    nonce?: string | null;
}

export interface Embed {
    type: string;
    title?: string;
    description?: string;
    url?: string;
    timestamp?: unknown;
    author?: {
        name: string,
        icon_url?: string,
    };
    footer?: {
        text: string,
        icon_url?: string,
    };
    fields?: {
        name: string,
        value: string,
        inline: boolean,
    }[]
}

export interface User {
    id: number;
    id_string: string;
    name: string;
    avatar?: string | null;
    guilds?: Guild[] | null;
    flags: number;
    discriminator: number;
}

export interface Guild {
    id: number;
    id_string: string;
    owner_id: number;
    owner_id_string: string;
    name: string;
    channels?: Channel[];
    members?: Member[];
    icon?: string | null;
    flags: number;
}

export interface Channel {
    id: number;
    id_string: string;
    name: string;
    guild_id: number;
    guild_id_string: string;
    guild?: Guild;
}

export interface Member {
    user_id: number;
    user_id_string: string;
    user?: User;
    guild_id: number;
    guild_id_string: string;
    guild?: Guild;
}
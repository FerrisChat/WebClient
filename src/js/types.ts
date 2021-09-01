export interface UserData {
    id: string;
    name: string;
    discriminator: string;
    avatarUrl?: string;
}

export interface MessageData {
    id: string;  // Sucks to be JS
    content: string;
    author: UserData;
}

export interface ServerData {
    id: string;
    name: string;
    iconUrl?: string;
}

export interface DMData {
    id: string;
    recipient: UserData;
}

export interface ServerSelectData {
    servers: ServerData[];
    dms: DMData[];
}

export enum ServerChannelType {  // CATEGORY will be implemented differently
    TEXT,
    VOICE,
    STAGE,
    ANNOUNCEMENT
}

export interface ServerChannelData {
    id: string;
    name: string;
    type: ServerChannelType;
}

export interface ServerCategoryData {
    id: string;
    name: string;
    channels: ServerChannelData[];
}

export interface ServerChannelSelectData {
    channels: ServerChannelData[];
    categories: ServerCategoryData[];
}

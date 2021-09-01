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

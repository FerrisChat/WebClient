import RESTClient from './api/rest.js';
import Websocket from './api/websocket.js';

import { ServerData, ServerChannelData } from '../types';

interface Page {
    server_id?: string;
    channel_id?: string;
    dm: boolean;
}

interface Cache {
    servers: Map<string, ServerData>;
    channels: Map<string, ServerChannelData>;
}

export default class Client {
    http?: RESTClient;
    ws?: Websocket;
    page: Page;
    cache: Cache;

    constructor() {
        this.http = null;
        this.ws = null;
        
        this.page = {
            dm: false
        };
        this.cache = {
            servers: new Map(), 
            channels: new Map()
        };
    }
}

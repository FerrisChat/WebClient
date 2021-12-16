import Cookies from 'js-cookie';

import RESTClient from './RESTClient';
import WebSocketClient from './WebSocketClient';

import type { Router } from './Router';
import type { Guild, Message, User } from '../types/objects';

/**
 * Parent API client which wraps around both the REST and Gateway FerrisChat APIs.
 */
export default class API {
    rest?: RESTClient;
    ws?: WebSocketClient;

    user?: User;
    guilds?: Guild[];

    messages: Map<string, Message[]>;
    loadedChannels: Set<string>;

    constructor() {
        this.messages = new Map<string, Message[]>();
        this.loadedChannels = new Set<string>();
    }

    get router(): Router | undefined {
        return this.rest?.router
    }

    get token(): string | undefined {
        return this.rest?._token
    }

    async login({ email, password }: { email: string, password: string}): Promise<void> {
        const rest = new RESTClient({ email, password });
        try {
            const token = await rest.resolveToken();
            Cookies.set('token', token);
        }
        catch (err) {
            throw err;
        };
        this.rest = rest;
    }

    async loginWithToken(token: string): Promise<void> {
        const rest = new RESTClient({ token });
        this.rest = rest;
    }

    async register(options: { username: string, email: string, password: string, pronouns: string }) {
        const rest = new RESTClient({});
        try {
            await rest.register(options);
            Cookies.set('token', rest._token!)
        }
        catch (err) {
            throw err;
        }
        this.rest = rest;
    }

    async wsConnect(): Promise<void> {
        const ws = new WebSocketClient(this);
        try {
            await ws.connect()
        }
        catch (err) {
            throw err
        }
        this.ws = ws;
    }
}
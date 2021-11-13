import RESTClient from './requests/RESTClient';
import WebSocketClient from './requests/WebSocketClient';
import { GuildData, MessageData, UserData } from '../types';

export default class API {
    rest?: RESTClient;
    ws: WebSocketClient;
    
    user?: UserData;
    guilds?: GuildData[];
    messages: Map<string, MessageData[]>;
    loadedChannels: string[];
    unreadChannels: string[];

    ongoingPromise?: Promise<any>;
    _readyPromise: Promise<void>;
    _readyPromiseResolver?: Function;

    constructor({ rest, ws }: { rest?: RESTClient, ws?: WebSocketClient } = {}) {
        this.rest = rest;
        this.ws = ws || new WebSocketClient(this);
        this.wait().then(api => api.ws.connect());
        window._resolver(this);

        this._readyPromise = new Promise(r => this._readyPromiseResolver = r);

        // preset
        this.messages = new Map<string, MessageData[]>();
        this.loadedChannels = [];
        this.unreadChannels = [];
    }

    static fromLogin({ email, password }: { email?: string, password?: string } = {}): API {
        return new this({ rest: new RESTClient({ email, password }) });
    }

    static fromRegistration({ username, email, password }: { username: string, email: string, password: string }): API {
        const rest = new RESTClient();
        const cls = new this({ rest });
        cls.ongoingPromise = rest.register(username, email, password);
        return cls;
    }

    async updateGuilds(): Promise<void> {
        const response = await this.rest!.request('GET', `/users/${this.userId}`);
        this.guilds = response.guilds;

        // TODO: Remove this temporary, terrible workaround to an API limitation when it is fixed
        for (let guild of this.guilds!) {
            const response = await this.rest!.request('GET', `/guilds/${guild.id_string}`);
            guild.channels = response.channels;
        }
    }

    async wait(): Promise<API> {
        await this.rest?._authenticatePromise;
        await this.ongoingPromise;
        return this
    }

    async waitForReady(): Promise<API> {
        await this._readyPromise;
        return this;
    }

    get userId(): string | undefined {
        return this.user?.id_string;
    }

    get token(): string | undefined {
        return this.rest?.token;
    }
}
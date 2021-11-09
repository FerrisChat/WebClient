import RESTClient from './requests/RESTClient';
import WebSocketClient from './requests/WebSocketClient';
import { GuildData, UserData } from '../types';

export default class API {
    rest?: RESTClient;
    ws: WebSocketClient;
    user?: UserData;
    ongoingPromise?: Promise<any>;

    constructor({ rest, ws }: { rest?: RESTClient, ws?: WebSocketClient } = {}) {
        this.rest = rest;
        this.ws = ws || new WebSocketClient(this);
        this.wait().then(api => api.ws.connect());
        window._resolver(this);
    }

    static fromLogin({ email, password }: { email?: string, password?: string } = {}): API {
        return new this({ rest: new RESTClient({ email, password }) });
    }

    static fromRegistration({ username, email, password }: { username: string, email: string, password: string }): API {
        const rest = new RESTClient();
        rest.register(username, email, password);
        return new this({ rest });
    }

    async wait(): Promise<API> {
        await this.rest?._authenticatePromise;
        await this.ongoingPromise;
        return this
    }

    get userId(): string | undefined {
        return this.user?.id_string;
    }

    get guilds(): GuildData[] {
        return this.user?.guilds || [];
    }

    get token(): string | undefined {
        return this.rest?.token;
    }
}
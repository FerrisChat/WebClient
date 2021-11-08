import RESTClient from './requests/RESTClient';
import { GuildData } from '../types';

export default class API {
    rest?: RESTClient;
    ongoingPromise?: Promise<any>;

    constructor() {
        window._resolver(this)
    }

    static fromLogin({ email, password }: { email?: string, password?: string } = {}): API {
        const cls = new this();
        cls.rest = new RESTClient({ email, password });
        return cls
    }

    static fromRegistration({ username, email, password }: { username: string, email: string, password: string }): API {
        const cls = new this();
        cls.rest = new RESTClient();
        cls.ongoingPromise = cls.rest.register(username, email, password);
        return cls;
    }

    async wait() {
        let rest;
        if (rest = this.rest) {
            await rest._authenticatePromise;
            await this.ongoingPromise;
        }
    }

    get userId(): string | undefined {
        return this.rest?.user?.id_string;
    }

    get guilds(): GuildData[] {
        return this.rest?.user?.guilds || [];
    }

    get token(): string | undefined {
        return this.rest?.token;
    }
}
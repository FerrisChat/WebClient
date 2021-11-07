import { UserData } from '../../types';

export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS';
export const BASE_URL: string = 'https://api.ferris.chat/v0';

export default class RESTClient {
    token?: string;
    user?: UserData;

    constructor({
        email,
        password,
        token,
    }: {
        email?: string,
        password?: string,
        token?: string,
    } = {}) {
        if (token)
            this.token = token;
        else if (email && password)
            this.authenticate(email, password).then(token => this.token = token);
    }

    async authenticate(email: string, password: string): Promise<string> {
        console.info('Authenticating with credentials...');

        const response = await fetch(BASE_URL + '/auth', {
            method: 'POST',
            headers: {
                // @ts-ignore
                Email: email,
                Password: password,
            },
        });
        const json = await response.json();
        console.info('Successfully logged in.');
        return json.token;
    }

    static async register(username: string, email: string, password: string): Promise<RESTClient> {
        console.info('Registering new account...');

        const response = await fetch(BASE_URL + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });

        if (response.status > 299)
            console.error(`Could not register account. ${response.status} ${response.statusText}`);

        const cls = new this({ email, password });
        cls.user = await response.json();
        return cls;
    }

    async request(method: RequestMethod, route: string, {
        headers = {},
        params,
        body,
        json,
    } : {
        headers?: any,
        params?: any,
        body?: string,
        json?: any,
    } = {}): Promise<any> {
        if (this.token)
            headers.Authorization = this.token;

        if (json) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(json)
        }

        const queryParams = !params ? '' : '?' + new URLSearchParams(params).toString()

        const response = await fetch(BASE_URL + route + queryParams, {
            method,
            headers,
            // @ts-ignore
            body,
        });

        if (!response.ok) { 
            console.error(`Received ${response.status}: ${response.statusText} when requesting to ${route}`);
            return
        }

        const result = await response.text();
        console.debug(`Route ${route} responded with ${response.status}: ${response.statusText}. Data: ${result}`)

        if (response.headers.get('Content-Type') === 'application/json') {
            return JSON.parse(result)
        }

        return result;
    }
}
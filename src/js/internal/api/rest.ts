import fetch from 'node-fetch';
import Client from '../client';

const BASE_URL = "https://api.ferris.chat/v0/";
const USER_AGENT = "FerrisChat Web Client v0.0.0 (https://github.com/jay3332/ferris-chat-web-client)";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

export default class RESTClient {
    client: Client;
    _token: string;

    constructor(client: Client) {
        this.client = client;
        this._token = undefined;
    }

    putToken(token: string) {
        this._token = token;
    }

    async request(method: RequestMethod, url: string, body?: object, headers?: object): Promise<object> {
        headers = {
            "User-Agent": USER_AGENT,
            "Authorization": this._token,
            ...(headers || {})
        }

        const request = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        };

        if (url.startsWith('/')) url = url.slice(1);

        const response = await fetch(BASE_URL + url, request);
        const json = await response.json();

        return json;
    }
}

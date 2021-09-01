import fetch from 'node-fetch';
const BASE_URL = "https://api.ferris.chat/v0/";
const USER_AGENT = "FerrisChat Web Client v0.0.0 (https://github.com/FerrisChannel/WebClient)";
export default class RESTClient {
    client;
    _token;
    constructor(client) {
        this.client = client;
        this._token = undefined;
    }
    putToken(token) {
        this._token = token;
    }
    async request(method, url, body, headers) {
        headers = {
            "User-Agent": USER_AGENT,
            "Authorization": this._token,
            ...(headers || {})
        };
        const request = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        };
        if (url.startsWith('/'))
            url = url.slice(1);
        const response = await fetch(BASE_URL + url, request);
        const json = await response.json();
        return json;
    }
}
//# sourceMappingURL=rest.js.map
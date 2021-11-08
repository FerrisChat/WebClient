import API from '../API';

export default class WebSocketClient {
    api: API;
    ws?: WebSocket;

    constructor(api: API) {
        this.api = api;
    }

    get rest() {
        return this.api.rest
    }

    async fetchWebSocketURL(): Promise<string> {
        const response = await this.rest!.request('GET', '/ws/info');
        return response.url;
    }

    parseMessage(message: any) {
        console.log(message)
    }

    async connect() {
        const url = await this.fetchWebSocketURL();
        this.ws = new WebSocket(url);
        this.ws.onmessage = this.parseMessage.bind(this);
        this.ws.onopen = this.identify.bind(this);
    }

    close() {
        this.ws?.close();
    }

    identify() {
        this.sendJSON({c: 'Identify', d: {token: this.api.token, intents: 0}})
    }

    sendJSON(json: any) {
        this.ws!.send(JSON.stringify(json))
    }
}
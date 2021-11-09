import API from '../API';

export const WSEventHandlers: any = {
    IdentifyAccepted(ws: WebSocketClient, data: any) {
        ws.api.user = data.user;
    },
}

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

    parseMessage(message: MessageEvent) {
        console.log(message)

        const parsed = JSON.parse(message.data);
        const event = parsed.c;

        if (event) WSEventHandlers[event]?.(this, parsed.d);
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
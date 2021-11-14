import API from '../API';
import defaultAvatar from '../../assets/avatar_default.png';

export const WSEventHandlers: any = {
    IdentifyAccepted(ws: WebSocketClient, data: any) {
        if (!ws._identified) {
            ws._identified = true;
        
            const { api } = ws;
            api.user = data.user;
            api.updateGuilds().then(_ => api._readyPromiseResolver!());
        }
    },

    MessageCreate({ api }: WebSocketClient, data: any) {
        // TODO: Remove this when becomes available
        data.message.author = {
            id: data.message.author_id,
            id_string: data.message.author_id_string,
            name: `Unknown User (id: ${data.message.author_id_string})`,
            avatar: defaultAvatar,
            discriminator: 0,
        }

        const channelId = data.message.channel_id_string;
        if (!api.messages.has(channelId))
            api.messages.set(channelId, []);

        api.messages.get(channelId)!.push(data.message);
        api.unreadChannels.push(channelId);
    }
}

export default class WebSocketClient {
    api: API;
    ws?: WebSocket;
    url?: string;
    mustKeepAlive: boolean;
    
    _keepAlive?: any;
    _keepAliveListener?: any;
    _identified: boolean;

    constructor(api: API) {
        this.api = api;
        this.mustKeepAlive = false;
        this._identified = false;
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
        if (!this.url)
            this.url = await this.fetchWebSocketURL();

        this.mustKeepAlive = true;
        this.clear();

        this.ws = new WebSocket(this.url);
        this.ws.onmessage = this.parseMessage.bind(this);
        this.ws.onopen = this.identify.bind(this);
        this.ws.onerror = e => {
            if (e.eventPhase > 1 && this.mustKeepAlive) this.connect();
        };
        this.ws.onclose = () => {
            this.clear();
            if (this.mustKeepAlive) this.connect();
        };

        this._keepAlive = setInterval(this.sendHeartbeat.bind(this), 45000);
    }

    clear() {
        clearInterval(this._keepAlive);
        clearTimeout(this._keepAliveListener);
    }

    close() {
        this.mustKeepAlive = false;
        this.clear();
        this.ws?.close();
    }

    identify() {
        this.sendJSON({c: 'Identify', d: {token: this.api.token, intents: 0}})
    }

    sendHeartbeat() {
        this.ws!.send("heartbeat")
    }

    sendJSON(json: any) {
        this.ws!.send(JSON.stringify(json))
    }
}
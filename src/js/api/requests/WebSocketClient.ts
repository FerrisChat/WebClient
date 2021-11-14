import API from '../API';
import defaultAvatar from '../../assets/avatar_default.png';

export const WSEventHandlers: any = {
    IdentifyAccepted(ws: WebSocketClient, data: any) {
        if (!ws._identified) {
            ws._identified = true;
        
            const { api } = ws;
            api.user = data.user;
            api.user!.avatar = defaultAvatar;  // TODO: remove when they are implemented
            api.updateGuilds().then(_ => api._readyPromiseResolver!());
        }
    },

    MessageCreate({ api }: WebSocketClient, { message }: any) {
        // TODO: Remove this when becomes available
        message.author = {
            id: message.author_id,
            id_string: message.author_id_string,
            name: `Unknown User (id: ${message.author_id_string})`,
            avatar: defaultAvatar,
            discriminator: 0,
        }

        let obj;
        if (message.nonce && (obj = api.nonces.get(message.nonce))) {
            for (let k of Object.keys(message)) {
                // @ts-ignore
                obj[k] = message[k];
            }
            obj.__status__ = 'sent';
            api.nonces.delete(message.nonce);
            window.updateChat();
            return
        }

        const channelId = message.channel_id_string;
        if (!api.messages.has(channelId))
            api.messages.set(channelId, []);

        api.messages.get(channelId)!.push(message);
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
        this.ws!.sendJSON({c: 'Ping'})
    }

    sendJSON(json: any) {
        this.ws!.send(JSON.stringify(json))
    }
}

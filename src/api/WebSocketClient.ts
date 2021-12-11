import Cookies from 'js-cookie';

import type API from '../api/API';
import type {
    IdentifyAccepted,
} from '../types/ws';

import defaultAvatar from '../assets/icons/avatar_default.png';

export const WSEventHandlers: Record<string, (ws: WebSocketClient, event: any) => any> = {
    IdentifyAccepted(ws, { user }: IdentifyAccepted) {
        if (!ws._identified) {
            ws._identified = true;
            user!.avatar = defaultAvatar;  // TODO: remove when they are implemented
        
            const { api } = ws;
            api.user = user;
            api.guilds = user.guilds!;

            ws._waiter?.(true)
        }
    },
} as const

export default class WebSocketClient {
    api: API;
    ws?: WebSocket;
    url?: string;
    mustKeepAlive: boolean;
    
    _keepAlive?: any;
    _identified: boolean;
    _waiter?: (r: any) => void;

    constructor(api: API) {
        this.api = api;
        this.mustKeepAlive = false;
        this._identified = false;
    }

    get rest() {
        return this.api.rest
    }

    async fetchWebSocketURL(): Promise<string> {
        const response = await this.rest!.router.ws.info.get();
        return response.url;
    }

    parseMessage(message: MessageEvent) {
        console.log(message)

        if (message.data === 'null') {
            // server bug; token invalidated.
            Cookies.remove('token');
            window.location.reload()
        }

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
        await new Promise(resolve => this._waiter = resolve);
    }

    clear() {
        clearInterval(this._keepAlive);
    }

    close() {
        this.mustKeepAlive = false;
        this.clear();
        this.ws?.close();
    }

    identify() {
        this.sendJSON({
            c: 'Identify',
            d: {
                token: this.api.token,
                intents: 0,
            },
        })
    }

    sendHeartbeat() {
        this.sendJSON({ c: 'Ping' })
    }

    sendJSON(json: any) {
        this.ws!.send(JSON.stringify(json))
    }
}
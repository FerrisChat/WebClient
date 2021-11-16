import API from '../API';
import defaultAvatar from '../../assets/avatar_default.png';

import {
    IdentifyAcceptedEvent,
    MessageCreateEvent,
    MessageDeleteEvent,
    MemberCreateEvent,
} from '../../types';

export const WSEventHandlers: any = {
    IdentifyAccepted(ws: WebSocketClient, { user }: IdentifyAcceptedEvent) {
        if (!ws._identified) {
            ws._identified = true;
        
            const { api } = ws;
            api.user = user;
            api.user!.avatar = defaultAvatar;  // TODO: remove when they are implemented
            api.guilds = user.guilds!;
            api._readyPromiseResolver!();
        }
    },

    MessageCreate({ api }: WebSocketClient, { message }: MessageCreateEvent) {
        // TODO: Remove this when becomes available
        message.author.avatar = defaultAvatar;  // TODO: remove when impl

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
    },

    MessageDelete({ api }: WebSocketClient, { message }: MessageDeleteEvent) {
        const messages = api.messages.get(message.channel_id_string)!;
        const index = messages.findIndex(msg => msg.id_string === message.id_string);
        if (index) messages.splice(index, 1)
        window.updateChat();
    },

    MemberCreate({ api }: WebSocketClient, { member }: MemberCreateEvent) {
        const guild = api!.guilds?.find(guild => guild.id_string === member.guild_id_string);
        if (!guild) return;

        const channel = guild?.channels[0];
        if (!channel) return;

        // TODO: system messages
        guild.members.push(member);
        window.updateMembers();
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
        this.sendJSON({c: 'Ping'})
    }

    sendJSON(json: any) {
        this.ws!.send(JSON.stringify(json))
    }
}

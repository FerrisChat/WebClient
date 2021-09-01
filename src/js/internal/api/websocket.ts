import _Websocket from 'ws';
import Client from '../client';

export default class Websocket {
    _ws?: _Websocket;
    client: Client;

    constructor(client: Client) {
        this._ws = undefined;
        this.client = client;
    }

    
}

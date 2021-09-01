import EventEmitter from 'eventemitter3';

import RESTClient from './api/rest';
import Websocket from './api/websocket';

export default class Client extends EventEmitter {
    http?: RESTClient;
    ws?: Websocket;
    
    constructor() {
        super();
        this.http = this.ws = null;
    }
}

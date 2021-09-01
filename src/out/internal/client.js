export default class Client {
    http;
    ws;
    page;
    cache;
    constructor() {
        this.http = null;
        this.ws = null;
        this.page = {
            dm: false
        };
        this.cache = {
            servers: new Map(),
            channels: new Map()
        };
    }
}
//# sourceMappingURL=client.js.map
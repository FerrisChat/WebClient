import RESTClient from './requests/RESTClient';

export default class API {
    rest: RESTClient;

    constructor({ email, password }: { email?: string, password?: string } = {}) {
        this.rest = new RESTClient({ email, password });
    }

    get token(): string | undefined {
        return this.rest.token;
    }
}
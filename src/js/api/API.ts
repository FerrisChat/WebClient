import RESTClient from './requests/RESTClient';

export default class API {
    rest?: RESTClient;

    static fromLogin({ email, password }: { email?: string, password?: string } = {}): API {
        const cls = new this();
        cls.rest = new RESTClient({ email, password });
        return cls
    }

    static async fromRegistration({ username, email, password }: { username: string, email: string, password: string }): Promise<API> {
        const cls = new this();
        cls.rest = await RESTClient.register(username, email, password);
        return cls;
    }

    get token(): string | undefined {
        return this.rest?.token;
    }
}
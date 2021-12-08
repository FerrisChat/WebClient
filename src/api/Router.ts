import type RESTClient from './RESTClient';
import type { RequestMethod } from './RESTClient';

export const methods = [
    'get',
    'post',
    'patch',
    'put',
    'delete',
    'head',
    'options',
] as const;

const toRaw = [
    'toString',
    'valueOf',
    'constructor',
];

const o = () => {};

type Method = typeof methods[number];
type Requester = typeof RESTClient.prototype.request;
type Options = Parameters<Requester>[2];

type SanitizedRequester =
    ((options: Options) => ReturnType<Requester>)
    & {
        json(json: any): ReturnType<Requester>,
        withHeaders(headers: any): ReturnType<Requester>,
        withParams(params: any): ReturnType<Requester>,
        // this is not repetitive as there is intellisense for parameter names
        [key: string]: (o: any) => ReturnType<Requester>,
    };

type PartialRoute = ((route: any) => PartialRoute) & Router;

export type Router = {
    readonly [x in Method]: SanitizedRequester
} & { [key: string]: PartialRoute };

export default function makeRouter(requester: Requester): Router {
    const parts = [ '' ];
    const handler: ProxyHandler<() => void> = {
        get(_, name: string) {
            if (toRaw.includes(name))
                return () => parts.join('/');
            
            const route = parts.join('/');
            
            if (methods.includes(name as Method)) {
                const makeRequest = (options: Options) => requester(
                    name.toUpperCase() as RequestMethod, route, options,
                );

                return new Proxy(() => {}, {
                    apply(_target, _thisArg, [ options = {} ]: Options[] = []) {
                        return makeRequest(options)
                    },
                    get(_, option: string) {
                        switch (option) {
                            case 'json': return (json: any = {}) => makeRequest({ json });
                            case 'withHeaders': return (headers: any) => makeRequest({ headers });
                            case 'withParams': return (params: any) => makeRequest({ params });
                        }
                        
                        // .json() could honestly be simplified to this
                        return (o: any) => makeRequest({ [option]: o });
                    },
                })
            }

            parts.push(name);
            return new Proxy(o, handler);
        },

        apply(_target, _thisArg, args: any[]) {
            parts.push(...args);
            return new Proxy(o, handler);
        }
    }

    return new Proxy(o, handler) as unknown as Router;
}
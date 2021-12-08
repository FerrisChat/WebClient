import makeRouter from './Router';
import type { Router } from './Router';

import { DEFAULT_API_URL } from '../constants';
import { HTTPError } from '../errors';

export type RequestMethod =
    'GET'
    | 'POST'
    | 'PATCH'
    | 'PUT'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'CONNECT'
    | 'TRACE';

export type RESTClientParams = {
    email?: string,
    password?: string,
    token?: string,
};

export type RESTClientOptions = {
    url: string,
}

/**
 * Interfaces around FerrisChat's REST API.
 */
export default class RESTClient {
    params: RESTClientParams;
    options: RESTClientOptions;
    _token?: string;

    constructor(params: RESTClientParams, options: RESTClientOptions = {
        url: DEFAULT_API_URL,
    }) {
        this.params = params;
        this.options = options;
        this._token = params.token;
    }

    /**
     * The router associated with this client.
     * @example
     * const router = window.api.rest.router;
     * 
     * router.channels(1234567890).messages.post.json({ content: "Hello" })
     *     .then(msg => console.log(msg.content));
     * @returns {Router}
     */
    get router(): Router {
        return makeRouter(this.request.bind(this));
    }

    /**
     * Resolves a token from the associated email and password.
     * If a token is already stored or given, then it is used instead.
     * @returns {Promise<string>} The token required for later authentication.
     * @throws {Error} Authentication failed.
     */
    async resolveToken(): Promise<string> {
        if (this._token) return this._token; 

        try {
            const response = await this.router.auth.post.json({
                email: this.params.email,
                password: this.params.password,
            });
            this._token = response.token;
            return this._token!;
        }
        catch (error) {
            let message;
            if (!(error instanceof HTTPError))
                message = 'An unknown error occured.';

            else switch (error.response.status) {
                case 401:
                case 403: message = 'Invalid email or password.'; break;
                case 404: message = 'User associated with the given email not found.'; break;
                case 500:
                case 502:
                case 504: message = 'The servers at FerrisChat are down!'; break; 
                default: message = 'An unknown error occurred.';
            }

            throw new Error(message);
        }
    }

    /**
     * A simplified method that sends a request to FerrisChat.
     * This essentially is a wrapper around the ``fetch`` DOM API.
     * It is, however, recommended to use the ``router`` API, see documentation for details.
     * @param {RequestMethod} method The HTTP request method/verb.
     * @param {string} route The route or endpoint to request to.
     * @param {object} options Request options
     * @returns {Promise<any>} Either the parsed JSON object if the Content-Type header
     * was "application/json" in the response body, or a raw string if it wasn't.
     * @throws {HTTPError} The request failed, or a non-successful status code was returned.
     */
    async request(
        method: RequestMethod,
        route: string,
        {
            body,
            headers = {},
            json,
            params,
        }: {
            body?: string,
            json?: any,
            params?: any,
            headers?: any,
        } = {},
    ): Promise<any> {
        if (this._token)
            headers.Authorization = this._token;

        if (json) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(json)
        }

        route = route.startsWith('/') ? route : '/' + route;
        const response = await fetch(
            this.options.url + route + (params ? '?' + new URLSearchParams(params).toString() : ''), 
            { method, headers, body },
        );

        const text = await response.text();
        const message = `[${route}] Received ${response.status}: ${response.statusText}. Body: ${text}`;

        if (!response.ok) { 
            console.error(message);
            throw new HTTPError(message, response)
        }

        console.debug(message)

        if (response.headers.get('Content-Type') === 'application/json') {
            return JSON.parse(text)
        }

        return text;
    }
}
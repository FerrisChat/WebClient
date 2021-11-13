import {
    GuildData,
    MessageData,
    UserData,
} from '../../types';

type QueryParams = `?${any}` | '';

export interface RESTClientTypes {
    request(method: 'GET', route: `/users/${bigint}`): Promise<UserData>;
    request(method: 'POST', route: '/users'): Promise<UserData>;

    request(method: 'GET', route: `/guild/${bigint}`): Promise<GuildData>;

    request(method: 'GET', route: `/channels/${bigint}/messages${QueryParams}`): Promise<MessageData[]>;
    request(method: 'GET', route: `/channels/${bigint}/messages/${bigint}`): Promise<MessageData>;
}
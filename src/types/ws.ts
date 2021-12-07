import type {
    Member,
    Message,
    User,
} from './objects';

export interface IdentifyAccepted {
    user: User;
}

export interface MessageCreate {
    message: Message;
}

export interface MessageDelete {
    message: Message;
}

export interface MemberCreate {
    member: Member;
}
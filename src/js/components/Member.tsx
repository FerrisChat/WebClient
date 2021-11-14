import React from 'react';
import defaultAvatar from '../assets/avatar_default.png';

type P = { id: string, name: string, avatar?: string | null };

export default function Member({ id, name, avatar }: P) {
    return (
        <div className="members-member" data-user-id={id}>
            <div className="members-member-avatar">
                <img src={avatar || defaultAvatar} />
            </div>
            <div className="members-member-content">
                {name}
            </div>
        </div>
    )
}
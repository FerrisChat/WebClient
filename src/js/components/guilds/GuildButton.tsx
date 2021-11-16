import React from 'react';
import { Link, useParams } from 'react-router-dom';
import defaultIcon from '../../assets/server_default.jpg';

type P = { id: string, name: string, iconUrl?: string };

export default function GuildButton({ id, name, iconUrl = defaultIcon }: P) {
    const className = useParams().guildId == id ? 'guild-select-guild active' : 'guild-select-guild';
    return (
        <Link className={className} to={`/channels/${id}`} data-guild-id={id} data-guild-name={name}>
            <img src={iconUrl} alt='server avatar' />
        </Link>
    )
}
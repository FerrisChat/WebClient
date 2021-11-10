import React from 'react';
import { Link, useParams } from 'react-router-dom';

type P = { id: string, name: string };

export default function ChannelButton({ id, name }: P) {
    const { guildId, channelId } = useParams();
    const className = channelId == id ? 'channel-select-channel active' : 'channel-select-channel';
    return (
        <Link className={className} to={`/channels/${guildId}/${id}`} data-channel-id={id} data-channel-name={name}>
            #{name}
        </Link>
    )
}
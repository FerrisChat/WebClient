import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ChannelHomepageButton() {
    const { guildId, channelId } = useParams();
    const className = channelId == null ? 'channel-select-channel active' : 'channel-select-channel';
    return (
        <Link className={className} to={`/channels/${guildId}`}>
            Home
        </Link>
    )
}
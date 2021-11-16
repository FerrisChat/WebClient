import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChannelButton from './ChannelButton';
import ChannelHomepageButton from './ChannelHomepageButton';

export default function ChannelSelect() {
    const { guildId } = useParams();
    const guild = window.api!.guilds!.find(guild => guild.id_string == guildId);

    if (!guild) {
        useNavigate()('/home')
    }

    return (
        <div className='channel-select'>
            <div className='channel-select-channels'>
                <ChannelHomepageButton />
                {guild!.channels?.map(channel => <ChannelButton id={channel.id_string} key={channel.id_string} name={channel.name} />)}
            </div>
        </div>
    )
}
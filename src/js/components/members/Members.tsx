import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForceUpdate } from '../../hooks';

import Member from './Member';

export default function Members() {
    const { guildId } = useParams();
    const guild = window.api!.guilds!.find(guild => guild.id_string == guildId);
    
    if (!guild) {
        useNavigate()('/home')
    }

    window.updateMembers = useForceUpdate();

    return (
        <div className="members-container">
            <div className='member-heading-name'>
                Members ({guild!.members ? guild!.members.length : NaN})
                <hr />
            </div>
            <div className="members">
                {(guild!.members || []).map(({ user }) => 
                    <Member id={user!.id_string} name={user!.name} avatar={user!.avatar} key={user!.id_string} />
                )}
            </div>
        </div>
    )
}
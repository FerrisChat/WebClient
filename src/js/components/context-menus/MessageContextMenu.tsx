import React from 'react';
import { useParams } from 'react-router-dom';

import ContextMenu from './ContextMenu';
import ContextMenuButton from './ContextMenuButton';

import copyIcon from '../../assets/copy.png';
import linkIcon from '../../assets/link.svg';
import trashIcon from '../../assets/trash.svg';

import { MessageData } from '../../types';
import { copyToClipboard } from '../../utils';

export default function MessageContextMenu({ message, coordinates }: { message: MessageData, coordinates: [number, number] }) {
    const { guildId, channelId } = useParams();
    return (
        <ContextMenu coordinates={coordinates}>
            <ContextMenuButton
                content="Delete Message" 
                icon={trashIcon} 
                disabled={message.author_id_string !== window.api!.userId}
                onClick={_ => window.api!.rest!.request(
                    'DELETE', 
                    `/channels/${message.channel_id_string}/messages/${message.id_string}`,
                )}
            />
            <ContextMenuButton
                content="Copy Message Content"
                icon={copyIcon}
                onClick={_ => copyToClipboard(message.content)}
            />
            <ContextMenuButton
                content="Copy Message Link"
                icon={linkIcon}
                onClick={_ => copyToClipboard(
                    `${window.location.origin}/channels/${guildId}/${channelId}/${message.id_string}`,
                )}
            />
        </ContextMenu>
    )
}
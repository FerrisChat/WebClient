import React, { MouseEventHandler } from 'react';

interface ContextMenuButtonProps {
    content: string;
    icon?: string,
    disabled?: boolean;
    onClick: MouseEventHandler<Element>;
}

export default function ContextMenuButton({ content, icon, onClick, disabled = false }: ContextMenuButtonProps) {
    const className = disabled ? 'context-menu-button' : 'context-menu-button clickable';
    return (
        <div className={className} onClick={onClick}>
            {icon ? <img src={icon} /> : undefined}
            <span>{content}</span>
        </div>
    )
}
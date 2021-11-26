import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';

export enum ButtonStyle {
    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    danger = 'danger',
}

export interface ButtonProps {
    style: ButtonStyle;
    label: string;
    link?: string;
    onClick?: MouseEventHandler<Element>;
}

export default function Button({ style, label, link, onClick, ...props }: ButtonProps) {
    return (
        <button className={`specialized ${style}`} onClick={onClick || (link ? () => useNavigate()(link) : undefined)} {...props}>
            {label}
        </button>
    )
}
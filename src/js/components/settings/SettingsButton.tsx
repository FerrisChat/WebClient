import React from 'react';
import { Link } from 'react-router-dom';

type P = { label: string, path: string };

export default function SettingsButton({ label, path }: P) {
    const className = window.location.pathname.endsWith('/' + path) ? 'settings-button active' : 'settings-button';
    return (
        <Link className={className} to={`/settings/${path}`}>
            {label}
        </Link>
    )
}
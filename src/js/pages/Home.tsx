import React from 'react';
import CommonLayout from './CommonLayout';

export default function Home() {
    return (
        <CommonLayout>
            <p>Hello, {window.api?.user?.name}!</p>
            <p>You are in {window.api?.guilds?.length} guilds.</p>
        </CommonLayout>
    )
}
import React from 'react';

export default function Home() {
    return (
        <>
            <p>Hello, {window.api?.user?.name}!</p>
            <p>You are in {window.api?.guilds?.length} guilds.</p>
        </>
    )
}
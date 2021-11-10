import React from 'react';

export default function Home() {
    return (
        <>
            <p>Hello, {window.api?.user?.name}!</p>
            <p>You are in {window.api?.guilds?.length} guild{window.api?.guilds?.length > 1|| window.api?.guilds?.length < 1 ? "s" : ""  }.</p>
        </>
    )
}

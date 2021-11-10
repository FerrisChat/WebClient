import React from 'react';
import CommonLayout from './CommonLayout';

export default function Home() {
    return (
        <CommonLayout>
            <div className="generic-message">
                <h1>Hello, <b>{window.api?.user?.name}</b>!</h1>
                <p>You are in {window.api?.guilds?.length} guild{window.api?.guilds?.length !== 1 ? "s" : ""}.</p>
            </div>
        </CommonLayout>

    )
}

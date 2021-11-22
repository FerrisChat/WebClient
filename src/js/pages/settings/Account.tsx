import Cookies from 'js-cookie';
import React from 'react';

import SettingsLayout from "./SettingsLayout";
import Button, { ButtonStyle } from "../../components/common/Button";

export default function Account() {
    return (
        <SettingsLayout>
            <div className="account-settings-tag">
                <span className="username">{window.api!.user!.name}</span>
                <span className="discriminator">#{window.api!.user!.discriminator.toString().padStart(4, '0')}</span>
            </div>
            <div className="account-settings-buttons">
                <Button style={ButtonStyle.success} label='Verify Account' onClick={() => {
                    window.api!.rest!.request('POST', '/verify', { json: {} }).then(
                        _ => alert('Sent a verification link to the email accosiated with this account.')
                    );
                }} />
                <Button style={ButtonStyle.danger} label='Log Out' onClick={() => {
                    Cookies.remove('token');
                    window.location.pathname = '/login';
                }} />
                <Button style={ButtonStyle.danger} label='Delete Account' onClick={() => {
                    window.api!.rest!.request('DELETE', `/users/${window.api!.userId}`).then(() => {
                        Cookies.remove('token');
                        window.location.pathname = '/login';
                    })
                }} />
            </div>
        </SettingsLayout>
    )
}
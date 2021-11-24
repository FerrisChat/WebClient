import React from 'react';
import SettingsLayout from "./SettingsLayout";

function PresetTheme({ label, name, description }: { label: string, name: string, description: string }) {
    return (
        <div className="preset-theme" onClick={() => window.themeManager.putPresetTheme(name)}>
            <div className="preset-theme-label">{label}</div>
            <div className="preset-theme-description">{description}</div>
        </div>
    )
}

export default function Theme() {
    return (
        <SettingsLayout>
            <div className="themes">
                <div className="preset-themes">
                    <PresetTheme label='Light' name='light' description='A light theme with bright, contrasted colors.' />
                    <PresetTheme label='Dark' name='dark' description='The default theme: A dark theme with moderately contrasted colors.' />
                    <PresetTheme label='Midnight' name='midnight' description='A pitch, pure black theme with contrast in text. Darker than dark mode.' />
                </div>
            </div>
        </SettingsLayout>
    )
}
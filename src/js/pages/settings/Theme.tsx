import Cookies from 'js-cookie';
import React from 'react';
import type { FormEvent } from 'react';

import Button, { ButtonStyle } from '../../components/common/Button';
import SettingsLayout from "./SettingsLayout";

function PresetTheme({ label, name, description }: { label: string, name: string, description: string }) {
    return (
        <div className="preset-theme" onClick={() => window.themeManager.putPresetTheme(name)}>
            <div className="preset-theme-label">{label}</div>
            <div className="preset-theme-description">{description}</div>
        </div>
    )
}

function CustomThemePicker({ label, name }: { label: string, name: string }) {
    const onInput = (e: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        window.themeManager.theme[name] = e.target.value;
        window.themeManager.updateThemeFor(name)
    }

    let current = window.themeManager.theme[name];
    return (
        <div className='custom-theme-picker'>
            <input type='color' id={`custom-theme-picker__${name}`} name={name} value={current} onInput={onInput} />
            <div className='custom-theme-picker-color' id={`custom-theme-picker-color__${name}`} onClick={() =>
                document.getElementById(`custom-theme-picker__${name}`)?.click()
            } style={{backgroundColor: current}} />
            <div className='custom-theme-picker-content'>
                <div>{label}</div>
                <input id={`custom-theme-picker-text__${name}`} type='text' placeholder={current} onChange={onInput}  />
            </div>
        </div>
    )
}

export default function Theme() {
    return (
        <SettingsLayout>
            <div className="themes">
                <h1>Themes</h1>
                <div className="preset-themes">
                    <h2>Preset Themes</h2>
                    <PresetTheme label='Light' name='light' description='A light theme with bright, contrasted colors.' />
                    <PresetTheme label='Dark' name='dark' description='The default theme: A dark theme with moderately contrasted colors.' />
                    <PresetTheme label='Midnight' name='midnight' description='A pitch, pure black theme with contrast in text. Darker than dark mode.' />
                </div>
                <div className="custom-theme">
                    <h2>Custom Theme</h2>
                    <div className="custom-theme-pickers">
                        <CustomThemePicker label="Background (Primary)" name="dark" />
                        <CustomThemePicker label="Background (Secondary/Chat)" name="darker" />
                        <CustomThemePicker label="Background (Tertiary)" name="darkest" />
                        <CustomThemePicker label="Background (Quaternary)" name="pitch" />
                        <CustomThemePicker label="Generic (Primary)" name="primary" />
                        <CustomThemePicker label="Generic (Secondary)" name="secondary" />
                        <CustomThemePicker label="Text/Foreground" name="text" />
                        <CustomThemePicker label="Text/Foreground (Error)" name="error" />
                        <CustomThemePicker label="Link" name="link" />
                        <CustomThemePicker label="Link (Hover)" name="link-hover" />
                        <CustomThemePicker label="Scrollbar Thumb" name="scrollbar-front" />
                        <CustomThemePicker label="Scrollbar Thumb (Hover)" name="scrollbar-front-hover" />
                        <CustomThemePicker label="Scrollbar Track" name="scrollbar-back" />
                        <CustomThemePicker label="Button (Primary)" name="button-primary" />
                        <CustomThemePicker label="Button (Secondary)" name="button-secondary" />
                        <CustomThemePicker label="Button (Success)" name="button-success" />
                        <CustomThemePicker label="Button (Danger)" name="button-danger" />
                    </div>
                    <Button style={ButtonStyle.success} label='Save' onClick={() => {
                        Cookies.set('theme', JSON.stringify(window.themeManager.theme))
                    }} />
                </div>
            </div>
        </SettingsLayout>
    )
}
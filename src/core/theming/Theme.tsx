import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';

import Fonts, { Font } from'./Fonts';

export class Reference<T = any> {
    private $key: string[];

    constructor(key: string) {
        this.$key = key.split('.');
    }

    resolved(obj: { [key: string]: any }): T {
        for (const key of this.$key) obj = obj[key];
        return obj as unknown as T
    }
}

export function ref<T>(key: string) {
    return new Reference<T>(key)
}

export type ThemeTemplateValue<T = string> = T | Reference<T>;

export interface ThemeTemplate extends Record<string, ThemeTemplateValue<any>> {
    primary: ThemeTemplateValue;
    secondary: ThemeTemplateValue;
    tertiary: ThemeTemplateValue;
    quarternary: ThemeTemplateValue;

    text: ThemeTemplateValue;
    link: ThemeTemplateValue;
    linkHover: ThemeTemplateValue;

    success: ThemeTemplateValue;
    warning: ThemeTemplateValue;
    error: ThemeTemplateValue;

    accent: {
        primary: ThemeTemplateValue;
        secondary: ThemeTemplateValue;
    };

    fonts?: ThemeTemplateValue<Partial<{
        serif: ThemeTemplateValue<Font>,
        monospace: ThemeTemplateValue<Font>,
    }>>;

    toast?: ThemeTemplateValue<Partial<{
        generic: ThemeTemplateValue;
        success: ThemeTemplateValue;
        warning: ThemeTemplateValue;
        error: ThemeTemplateValue;
    }>>;

    button?: ThemeTemplateValue<Partial<{
        primary: ThemeTemplateValue;
        secondary: ThemeTemplateValue;
        success: ThemeTemplateValue;
        warning: ThemeTemplateValue;
        error: ThemeTemplateValue;
    }>>;

    scrollbar?: ThemeTemplateValue<Partial<{
        thumb: ThemeTemplateValue;
        track: ThemeTemplateValue;
        background: ThemeTemplateValue;
    }>>;
}

export type SanitizedThemeTemplate = {
    [key in keyof ThemeTemplate]-?: ThemeTemplate[key] extends ThemeTemplateValue<string> ? string : any  // Required<ThemeTemplate[key]<T>>
}

export function makeTheme(theme: ThemeTemplate): ThemeTemplate {
    return {
        fonts: {
            serif: Fonts.Inter,
            monospace: Fonts.FiraCode,
            ...theme.fonts,
        },
        toast: {
            generic: ref('accent.secondary'),
            success: ref('success'),
            warning: ref('warning'),
            error: ref('error'),
            ...theme.toast,
        },
        button: {
            primary: ref('accent.primary'),
            secondary: ref('accent.secondary'),
            success: ref('success'),
            warning: ref('warning'),
            error: ref('error'),
            ...theme.button,
        },
        scrollbar: {
            thumb: 'inherit',
            track: 'inherit',
            background: 'inherit',
            ...theme.scrollbar,
        },
        ...theme,
    }
}

export const presetThemes: Record<string, ThemeTemplate> = {
    dark: makeTheme({
        primary: '#35393b',
        secondary: '#292e30',
        tertiary: '#23231a',
        quarternary: '#0a0b0b',

        text: '#ffffff',
        link: '#74dfff',
        linkHover: '#10c7ff',

        success: '#39b462',
        warning: '#daa11d',
        error: '#d65757',

        accent: {
            primary: '#5ca7d3',
            secondary: '#939394',
        },
    })
} as const;

function $resolveThemeTemplate(theme: ThemeTemplate, buffer?: any, $$loadFonts: boolean = true): SanitizedThemeTemplate {
    if (!buffer) buffer = theme;

    for (const [ k, v ] of Object.entries(buffer)) {
        if (v instanceof Reference) {
            buffer[k] = v.resolved(theme)
        }
        // @ts-ignore
        else if (typeof v === 'object' && !v?.serif) {
            buffer[k] = $resolveThemeTemplate(theme, v, false)
        }
    }

    if ($$loadFonts) loadFonts(theme)
    return theme as SanitizedThemeTemplate
}

const $knownFonts: string[] = [];

function $loadFont(font: Font) {
    if ($knownFonts.includes(font.name)) return;
    WebFont.load(font.loader);
    $knownFonts.push(font.name)
}

export function loadFonts({ fonts: { serif, monospace } }: ThemeTemplate | SanitizedThemeTemplate) {
    $loadFont(serif)
    $loadFont(monospace)
}

export const defaultTheme = $resolveThemeTemplate(presetThemes.dark);

const BaseTheme = createGlobalStyle<{ theme: SanitizedThemeTemplate }>`
    :root {
        --font-serif: '${props => props.theme.fonts.serif.name}', serif;
        --font-monospace: '${props => props.theme.fonts.monospace.name}', monospace;
    }

    * {
        color: ${props => props.theme.text};
        font-family: var(--font-serif);
    }
    
    html {
        background-size: cover;
        background-repeat: no-repeat;
    }

    body {
        margin: 0;
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.secondary};
    }

    a {
        color: ${props => props.theme.link};
        text-decoration: none;
        transition: color 0.5s ease;
    }

    a:hover {
        color: ${props => props.theme.linkHover};
    }

    #app {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
    }
`;

export default function Theme({ children }: SupportsChildren) {
    // TODO: Cookies
    const [ theme, setTheme ] = useState<SanitizedThemeTemplate>(defaultTheme);

    // This could be achieved with React.useContext but that has a bit more boilerplate
    window.app.setTheme = (t: ThemeTemplate) =>
        // Preserve font
        setTheme($resolveThemeTemplate({ ...t, fonts: { ...theme.fonts, ...t.fonts } }));

    window.app.updateTheme = (t: ThemeTemplate) =>
        setTheme($resolveThemeTemplate({ ...theme, ...t, fonts: { ...theme.fonts, ...t.fonts } }));

    return (
        <ThemeProvider theme={theme}>
            <BaseTheme/>
            {children}
        </ThemeProvider>
    )
}
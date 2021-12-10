import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from "styled-components";

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

function $resolveThemeTemplate(theme: ThemeTemplate, buffer?: any): SanitizedThemeTemplate {
    if (!buffer) buffer = theme;

    for (const [ k, v ] of Object.entries(buffer)) {
        if (v instanceof Reference) {
            buffer[k] = v.resolved(theme)
        }
        else if (typeof v === 'object') {
            buffer[k] = $resolveThemeTemplate(theme, v)
        }
    }
    return theme as SanitizedThemeTemplate
}

export const defaultTheme = $resolveThemeTemplate(presetThemes.dark);

const BaseTheme = createGlobalStyle<{ theme: SanitizedThemeTemplate }>`
    * {
        color: ${props => props.theme.text};
        font-family: inherit;
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
`;

export default function Theme({ children }: SupportsChildren) {
    // TODO: Cookies
    const [ theme, setTheme ] = useState<SanitizedThemeTemplate>(defaultTheme);

    // This could be achieved with React.useContext but that has a bit more boilerplate
    window.app.setTheme = (t: ThemeTemplate) => setTheme($resolveThemeTemplate(t));
    window.app.updateTheme = (t: ThemeTemplate) => setTheme($resolveThemeTemplate({ ...theme, ...t }));

    return (
        <ThemeProvider theme={theme}>
            <BaseTheme/>
            {children}
        </ThemeProvider>
    )
}
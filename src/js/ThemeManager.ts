import Cookies from 'js-cookie';

import light from './themes/light.json';
import dark from './themes/dark.json';
import midnight from './themes/midnight.json';

export const THEME_MAPPING: any = {
    light,
    dark,
    midnight,
}

export default class ThemeManager {
    theme: any;
    themeName?: string;
    _selector: any;

    constructor() {
        this._selector = document.querySelector(':root')
        this.resolveTheme();
    }

    resolveTheme() {
        this.theme = Object.assign({}, THEME_MAPPING[this.themeName = Cookies.get('theme') || 'dark']);
        this.updateTheme();
    }

    updateElements(k: string, v: any) {
        const pickerElement = document.getElementById(`custom-theme-picker__${k}`);
        // @ts-ignore
        if (pickerElement) pickerElement.value = v;

        const showElement = document.getElementById(`custom-theme-picker-color__${k}`);
        // @ts-ignore
        if (showElement) showElement.style.backgroundColor = v;

        const textPickerElement = document.getElementById(`custom-theme-picker-text__${k}`);
        // @ts-ignore
        if (textPickerElement) textPickerElement.value = v;
    }

    updateTheme() {
        for (const [k, v] of Object.entries(this.theme)) {
            this._selector.style.setProperty('--' + k, v);
            this.updateElements(k, v)
        }
    }

    updateThemeFor(key: string) {
        this._selector.style.setProperty('--' + key, this.theme[key]);
        this.updateElements(key, this.theme[key])
    }

    putPresetTheme(name: string) {
        const theme = Object.assign({}, THEME_MAPPING[name = name.toLowerCase()]);
        if (!theme) return;

        Cookies.set('theme', this.themeName = name);
        this.theme = theme;
        this.updateTheme();
    }
}
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
        this.theme = THEME_MAPPING[this.themeName = Cookies.get('theme') || 'dark'];
        this.updateTheme();
    }

    updateTheme() {
        for (const [k, v] of Object.entries(this.theme)) {
            this._selector.style.setProperty('--' + k, v);
        }
    }

    putPresetTheme(name: string) {
        const theme = THEME_MAPPING[name = name.toLowerCase()];
        if (!theme) return;

        Cookies.set('theme', this.themeName = name);
        this.theme = theme;
        this.updateTheme();
    }
}
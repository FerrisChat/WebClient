import type { Config } from 'webfontloader';

export interface Font {
    name: string;
    loader: Config;
    type: 'serif' | 'monospace';
}

const Fonts: Record<string, Font> = {
    Inter: {
        name: 'Inter',
        loader: {
            google: {
                families: ['Inter:200,300,400,500,600,700,800,900'],
            },
        },
        type: 'serif',
    },
    AtkinsonHyperlegible: {
        name: 'Atkinson Hyperlegible',
        loader: {
            google: {
                families: ['Atkinson Hyperlegible:400,400i,700,700i'],
            },
        },
        type: 'serif',
    },
    FiraCode: {
        name: 'Fira Code',
        loader: {
            google: {
                families: ['Fira Code:300,400,500,600,700'],
            },
        },
        type: 'monospace',
    },
};

export default Fonts;

const _filterType = (t: string) => Object.fromEntries(
    Object.entries(Fonts).filter(([ _, v ]) => v.type === t)
)

export const SerifFonts = _filterType('serif');
export const MonospaceFonts = _filterType('monospace');
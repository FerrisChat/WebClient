const IE: boolean = /MSIE|Trident/.test(window.navigator.userAgent);

/**
 * Most browsers support this. Internet Explorer doesn't; IE will return an unparsed fallback
 */
export function parseCSSColor(color: string, forceAlpha?: number) {
    if (IE) return {
        r: 0,
        g: 0,
        b: 0,
        a: forceAlpha || 1,
        hex: color,
        hexa: color,
        rgb: color,
        rgba: color,
    }

    const element = document.createElement('div');
    element.style.color = color;

    const { style: { color: parsed } } = element;
    const [ r, g, b, a ] = parsed.slice(parsed.startsWith('rgba') ? 5 : 4, -1).split(/ *, */g).map(Number);
    const hex = '#' + [ r, g, b ].map(o => o.toString(16).padStart(2, '0')).join('');
    const actualA = forceAlpha == null ? (a ?? 1) : forceAlpha;

    return {
        r,
        g,
        b,
        a: actualA,
        hex,
        hexa: a == null
            ? hex
            : hex + Math.floor(a * 255).toString(16).padStart(2, '0'),
        rgb: `rgb(${r}, ${g}, ${b})`,
        rgba: `rgba(${r}, ${g}, ${b}, ${actualA})`,
    }
}
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
    element.remove()

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

export const FERRIS_EPOCH_MS: number = 1_577_836_800_000;
const BIGINT_64: bigint = BigInt(64);  // Some browsers do not support bigint literals (e.g. 64n)

export function parseSnowflake(snowflake: string | bigint): Date {
    if (typeof snowflake === 'string')
        snowflake = BigInt(snowflake);

    return new Date(Number(snowflake >> BIGINT_64) + FERRIS_EPOCH_MS)
}

export function generateSnowflake(date?: number | Date): bigint {
    let now = date || Date.now();
    if (now instanceof Date) now = now.getTime();
    return BigInt(now - FERRIS_EPOCH_MS) << BIGINT_64;
}

export function isSameDay(date: Date, now: Date): boolean {
    return (
        date.getDate() === now.getDate()
        && date.getMonth() === now.getMonth()
        && date.getFullYear() === now.getFullYear()
    )
}

export function humanizeDate(date: Date): string {
    const now = Date.now();

    let day;
    if (isSameDay(date, new Date(now))) {
        day = 'Today'
    } else if (isSameDay(date, new Date(now - 86400000))) {
        day = 'Yesterday'
    } else if (isSameDay(date, new Date(now + 86400000))) {
        day = 'Tomorrow'
    } else {
        day = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });  // TODO: Support for customizable locales
    }

    return day + ` at ${date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })}`
}
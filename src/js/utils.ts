export const FERRIS_EPOCH_MS: number = 1_640_995_200_000;
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
    } else if (isSameDay(date, new Date(now - 86400))) {
        day = 'Yesterday'
    } else if (isSameDay(date, new Date(now + 86400))) {
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

export function decodeHTML(html: string): string {
    let area = document.createElement("textarea");
    area.innerHTML = html;
    return area.value;
}

export function copyToClipboard(text: string) {
    // @ts-ignore
    if (window.clipboardData && window.clipboardData.setData) {
        // @ts-ignore
        return window.clipboardData.setData("Text", text);
    }

    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}
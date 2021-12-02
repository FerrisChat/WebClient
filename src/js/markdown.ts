import hljs from 'highlight.js';
import mdit from 'markdown-it';

const options = {
    breaks: true,
    linkify: true,
    highlight(code: string, language?: string): string {
        try {
            return (
                language
                ? hljs.highlight(code, { language, ignoreIllegals: true })
                : hljs.highlightAuto(code)
            )
                .value;
        }
        catch (_) {
            return `<code class='hljs'>${code}</code>`
        }
    },
};

const md = mdit(options);
export const previewMD = mdit(options);

const rules = previewMD.renderer.rules = md.renderer.rules;

// Underline support
rules.strong_open = rules.strong_close =
    (tokens, index, options, _env, self) => {
        let token = tokens[index];
        if (token.markup === '__') {
            token.tag = 'u';
        }
        return self.renderToken(tokens, index, options);
    };

rules.code_inline = (tokens, index, options) => {
    const code = tokens[index];
    const next = tokens[++index];
    let lang;
  
    if (next && next.type === 'text') {
        const match = /^{:?\.([^}]+)}/.exec(next.content);
 
        if (match) {
            lang = match[1];
            next.content = next.content.slice(match[0].length)
        }
    }

    // @ts-ignore
    const highlighted = md.options.highlight?.(code.content, lang, undefined);
    const cls = lang ? ` class="${options.langPrefix}${md.utils.escapeHtml(lang)}"` : '';
 
    return `<code${cls}>${highlighted}</code>`;
}

type T = (...args: any[]) => string;

function wrap(callback?: T): T | undefined {
    if (!callback) return;
    return (...args): string => {
        return callback(...args)
            .replace('<code class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">');
    }
}

rules.fence = wrap(rules.fence);
rules.code_block = wrap(rules.code_block);

const doRender = previewMD.renderer.renderToken.bind(previewMD.renderer);
previewMD.renderer.renderToken = ((tokens: any, idx: any, options: any) => {
    const token = tokens[idx];
    if (token.hidden) return '';

    const r = doRender(tokens, idx, options);
    return token.markup ? `
        <span class='md-fragment'>${token.markup}</span>
        ${r}
        <span class='md-fragment'>${tokens[++idx]?.markup}</span>
    ` : r;
}).bind(previewMD.renderer);

export default md;
class HTMLParser {
    static markdownToHTML(markdownText) {
        const preBlocks = [];
        markdownText = markdownText.replace(/```([\s\S]*?)```/g, (match, p1) => {
            preBlocks.push(p1);
            return '%%PRE_BLOCK%%';
        })
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/_(\p{L}[\p{L}\p{M}\s_]*\p{L})_/gu, '<i>$1</i>')
            .replace(/`(\p{L}[\p{L}\p{M}\s_]*\p{L})`/gu, '<tt>$1</tt>')

        HTMLParser._checkCoherence(markdownText);
        HTMLParser._checkOpenedTags(markdownText);

        markdownText = markdownText.replace(/%%PRE_BLOCK%%/g, () => '<pre>' + preBlocks.shift() + '</pre>');

        const paragraphs = markdownText.split(/\n\s*\n/);
        for (let i = 0; i < paragraphs.length; i++) {
            if (!/<\/?[a-z][\s\S]*>/i.test(paragraphs[i])) {
                paragraphs[i] = '<p>' + paragraphs[i].trim() + '</p>';
            }
        }

        return paragraphs.join('\n');
    }

    static _checkCoherence(markdownText) {
        const tags = markdownText.match(/<\/?[^>]+>/g) || [];

        for (let i = 0; i < tags.length; i += 2) {
            if (tags[i] !== tags[i + 1].replace('/', '')) {
                throw new Error("There are nested loops");
            }
        }
    }

    static _checkOpenedTags(markdownText) {
        const words = markdownText.split(/\s+/);
        const markdownSymbols = ['**', '_', '`'];
        for (const word of words) {
            for (const symbol of markdownSymbols) {
                if ((word.startsWith(symbol) || word.endsWith(symbol)) && word !== symbol) {
                    throw new Error(`There is not finished markdown - ${word}`);
                }
            }
        }
    }

    static formatTextWithANSI(text) {
        const tagMap = {
            '<b>': '\x1b[1m',
            '<tt>': '\x1b[7m',
            '<pre>': '\x1b[7m',
            '<i>': '\x1b[3m',
            '<p>': '\t',
        };

        const endTagMap = {
            '</b>': '\x1b[0m',
            '</tt>': '\x1b[0m',
            '</pre>': '\x1b[0m',
            '</i>': '\x1b[0m',
            '</p>': '',
        };

        let formattedText = text;

        Object.entries(tagMap).forEach(([tag, code]) => {
            formattedText = formattedText.replace(new RegExp(tag, 'g'), code);
        });

        Object.entries(endTagMap).forEach(([tag, code]) => {
            formattedText = formattedText.replace(new RegExp(tag, 'g'), code);
        });

        return formattedText;
    }
}

module.exports = HTMLParser;
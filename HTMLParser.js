class HTMLParser {
    static markdownToHTML(markdownText) {
        const preBlocks = [];
        markdownText = markdownText.replace(/```([\s\S]*?)```/g, (match, p1) => {
            preBlocks.push(p1);
            return '%%PRE_BLOCK%%';
        })
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/_([\p{L}\p{M}_]+)_/gu, '<i>$1</i>')
            .replace(/`(.*?)`/g, '<tt>$1</tt>')
            .replace(/%%PRE_BLOCK%%/g, () => '<pre>' + preBlocks.shift() + '</pre>');

        const paragraphs = markdownText.split(/\n\s*\n/);
        for (let i = 0; i < paragraphs.length; i++) {
            if (!/<\/?[a-z][\s\S]*>/i.test(paragraphs[i])) {
                paragraphs[i] = '<p>' + paragraphs[i].trim() + '</p>';
            }
        }

        return paragraphs.join('\n');
    }
}

module.exports = HTMLParser;

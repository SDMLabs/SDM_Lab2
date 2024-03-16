const HTMLParser = require('./HTMLParser.js');

describe('HTMLParser', () => {
    describe('markdownToHTML', () => {
        let markdownText, expectedHTML;

        afterEach(() => {
            expect(HTMLParser.markdownToHTML(markdownText)).toBe(expectedHTML);
        });

        test('converts **bold** correctly', () => {
            markdownText = '**bold**';
            expectedHTML = '<b>boldak krut</b>';
        });

        test('converts _italic_ correctly', () => {
            markdownText = '_italic_';
            expectedHTML = '<i>italic</i>';
        });

        test('converts _italic with whitespaces_ correctly', () => {
            markdownText = '_italic with whitespaces_';
            expectedHTML = '<i>italic with whitespaces</i>';
        });

        test('converts `monospace` correctly', () => {
            markdownText = '`code`';
            expectedHTML = '<tt>code</tt>';
        });

        test('converts `monospace with whitespaces` correctly', () => {
            markdownText = '`monospace with whitespaces`';
            expectedHTML = '<tt>monospace with whitespaces</tt>';
        });

        test('converts ```preformatted``` correctly', () => {
            markdownText = '```preformatted```';
            expectedHTML = '<pre>preformatted</pre>';
        });

        test('converts paragraphs correctly', () => {
            markdownText = 'Paragraph 1\n\nParagraph 2';
            expectedHTML = '<p>Paragraph 1</p>\n<p>Paragraph 2</p>';
        });

        test('throws error for nested tags', () => {
            const textWithError = '**bold _italic_**';
            expect(() => HTMLParser.markdownToHTML(textWithError)).toThrowError(
                'There are nested loops'
            );
        });

        test('converts words with lowdashes correctly', () => {
            markdownText = ' _word_with_lowdash_ ';
            expectedHTML = ' <i>word_with_lowdash</i> ';
        });
    });


    describe('_checkCoherence', () => {
        test('throws error for nested tags', () => {
            const markdownText = '<b><i></b></i>';
            expect(() => HTMLParser._checkCoherence(markdownText)).toThrowError(
                'There are nested loops'
            );
        });

        test('does not throw error for coherent tags', () => {
            const markdownText = '<b></b><i></i>';
            expect(() => HTMLParser._checkCoherence(markdownText)).not.toThrow();
        });
    });

    describe('_checkOpenedTags', () => {
        test('throws error for opened tags', () => {
            const markdownText = 'text with _opened tag';
            expect(() => HTMLParser._checkOpenedTags(markdownText)).toThrowError(
                'There is not finished markdown - _opened'
            );
        });

        test('throws error for closing tags', () => {
            const markdownText = 'text with closing_ tag';
            expect(() => HTMLParser._checkOpenedTags(markdownText)).toThrowError(
                'There is not finished markdown - closing_'
            );
        });

        test('does not throw error for not opened tags', () => {
            const markdownText = 'text with opened tag';
            expect(() => HTMLParser._checkOpenedTags(markdownText)).not.toThrow();
        });
    });

    describe('formatTextWithANSI', () => {
        let htmlText, expectedText;

        afterEach(() => {
            expect(HTMLParser.formatTextWithANSI(htmlText)).toBe(expectedText);
        })

        test('converts <b>bold</b> correctly', () => {
            htmlText = '<b>bold</b>';
            expectedText = '\x1b[1mbold\x1b[0m';
        });

        test('converts <i>italic</i> correctly', () => {
            htmlText = '<i>italic</i>';
            expectedText = '\x1b[3mitalic\x1b[0m';
        });

        test('converts <tt>monospace</tt> correctly', () => {
            htmlText = '<tt>monospace</tt>';
            expectedText = '\x1b[7mmonospace\x1b[0m';
        });

        test('converts <pre>preformatted</pre> correctly', () => {
            htmlText = '<pre>preformatted</pre>';
            expectedText = '\x1b[7mpreformatted\x1b[0m';
        });

        test('converts <p>Paragraph 1</p><p>Paragraph 2</p> correctly', () => {
            htmlText = '<p>Paragraph 1</p>\n<p>Paragraph 2</p>';
            expectedText = '\tParagraph 1\n\tParagraph 2';
        });
    });
});

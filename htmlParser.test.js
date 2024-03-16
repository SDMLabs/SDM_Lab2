const HTMLParser = require('./HTMLParser.js');

describe('HTMLParser', () => {
    describe('markdownToHTML', () => {
        test('converts **bold** correctly', () => {
            const markdownText = '**bold**';
            const expectedHTML = '<b>bold</b>';
            expect(HTMLParser.markdownToHTML(markdownText)).toBe(expectedHTML);
        });

        test('converts _italic_ correctly', () => {
            const markdownText = '_italic_';
            const expectedHTML = '<i>italic</i>';
            expect(HTMLParser.markdownToHTML(markdownText)).toBe(expectedHTML);
        });

        test('converts _italic with whitespaces_ correctly', () => {
            const markdownText = '_italic with whitespaces_';
            const expectedHTML = '<i>italic with whitespaces</i>';
            expect(HTMLParser.markdownToHTML(markdownText)).toBe(expectedHTML);
        });

        test('converts `monospace` correctly', () => {
            const markdownText = '`code`';
            const expectedHTML = '<tt>code</tt>';
            expect(HTMLParser.markdownToHTML(markdownText)).toBe(expectedHTML);
        });

        test('converts `monospace with whitespaces` correctly', () => {
            const markdownText = '`monospace with whitespaces`';
            const expectedHTML = '<tt>monospace with whitespaces</tt>';
            expect(HTMLParser.markdownToHTML(markdownText)).toBe(expectedHTML);
        });

        test('converts ```preformatted``` correctly', () => {
            const markdownText = '```preformatted```';
            const expectedHTML = '<pre>preformatted</pre>';
            expect(HTMLParser.markdownToHTML(markdownText)).toBe(expectedHTML);
        });

        test('converts paragraphs correctly', () => {
            const markdownText = 'Paragraph 1\n\nParagraph 2';
            const expectedHTML = '<p>Paragraph 1</p>\n<p>Paragraph 2</p>';
            expect(HTMLParser.markdownToHTML(markdownText)).toBe(expectedHTML);
        });

        test('throws error for nested tags', () => {
            const markdownText = '**bold _italic_**';
            expect(() => HTMLParser.markdownToHTML(markdownText)).toThrowError(
                'There are nested loops'
            );
        });

        test('converts words with lowdashes correctly', () => {
            const markdownText = ' _word_with_lowdash_ ';
            const expectedHTML = ' <i>word_with_lowdash</i> ';
            expect(HTMLParser.markdownToHTML(markdownText)).toBe(expectedHTML);
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
});

const fs = require('fs');
const HTMLParser = require('./HTMLParser');
const { flags, checkArguments } = require('./utils');

function main() {
    try {
        const {argv} = process;

        checkArguments(argv);

        const [,, inputFile, flag, outputFile] = argv;

        const markdownText = fs.readFileSync(inputFile, 'utf-8');

        const htmlText = HTMLParser.markdownToHTML(markdownText);

        if (!outputFile) {
            console.log(flag === flags.HTML_FORMAT ? htmlText : HTMLParser.formatTextWithANSI(htmlText));
        } else {
            fs.writeFileSync(outputFile, htmlText);
            console.log(`HTML розмітка була збережена в файлі: ${outputFile}`);
        }

    } catch (error) {
        console.error('Помилка обробки файлу:', error);
        process.exit(1);
    }
}

main();
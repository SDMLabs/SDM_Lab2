const fs = require('fs');
const HTMLParser = require("./HTMLParser");

const flags = {
    OUTPUT: '--out',
    ANSI_FORMAT: '--format=ansi',
    HTML_FORMAT: '--format=html',
}

function checkArguments(argv) {
    const flag = argv[3];

    if (argv.length < 3 && argv.length > 5) {
        throw new Error("Wrong format of input arguments");
    }

    if (argv.length === 5 && flag !== flags.OUTPUT) {
        throw new Error("Wrong format of input arguments");
    }

    if(argv.length === 4 && flag !== flags.ANSI_FORMAT && flag !== flags.HTML_FORMAT) {
        throw new Error("Wrong format of input arguments");
    }
}

function main() {
    try {
        const {argv} = process;

        checkArguments(argv);

        const [,, inputFile, flag, outputFile] = argv;

        const markdownText = fs.readFileSync(inputFile, 'utf-8');

        const htmlText = HTMLParser.markdownToHTML(markdownText);

        if (!outputFile) {
            const text = HTMLParser.formatTextWithANSI(htmlText);
            //console.log(flag === flags.HTML_FORMAT ? htmlText : HTMLParser.formatTextWithANSI(htmlText));
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

module.exports = checkArguments;
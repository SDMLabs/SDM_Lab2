const fs = require('fs');
const HTMLParser = require("./HTMLParser");

function checkArguments(argv) {
    if (argv.length !== 3 && argv.length !== 5) {
        throw new Error("Wrong format of input arguments");
    }

    if (argv.length === 5 && argv[3] !== '--out') {
        throw new Error("Wrong format of input arguments");
    }
}

function main() {
    try {
        const {argv} = process;

        checkArguments(argv);

        const inputFile = argv[2];
        const outputFile = argv[4];

        const markdownText = fs.readFileSync(inputFile, 'utf-8');

        const htmlText = HTMLParser.markdownToHTML(markdownText);

        if (!outputFile) {
            console.log(htmlText);
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
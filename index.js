const fs = require('fs');

function checkArguments(argv) {
    if (argv.length !== 3 && argv.length !== 5) {
        throw new Error("Wrong format of input arguments");
    }

    if (argv.length === 5 && argv[3] !== '--out') {
        throw new Error("Wrong format of input arguments");
    }
}

function main() {
    const {argv} = process;

    checkArguments(argv);

    const inputFile = argv[2];
    const outputFile = argv[4];

    const markdownText = fs.readFileSync(inputFile, 'utf-8');
}

main();
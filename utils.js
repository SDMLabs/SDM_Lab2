const flags = {
    OUTPUT: '--out',
    ANSI_FORMAT: '--format=ansi',
    HTML_FORMAT: '--format=html',
}

function checkArguments(argv) {
    const flag = argv[3];

    if (argv.length < 3 || argv.length > 5) {
        throw new Error('Wrong format of input arguments');
    }

    if (argv.length === 5 && flag !== flags.OUTPUT) {
        throw new Error('Wrong format of input arguments');
    }

    if(argv.length === 4 && flag !== flags.ANSI_FORMAT && flag !== flags.HTML_FORMAT) {
        throw new Error('Wrong format of input arguments');
    }
}

module.exports = {flags, checkArguments};
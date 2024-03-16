const { checkArguments } = require('./utils');

describe('checkArguments function', () => {
    test('throws an error for wrong number of input arguments', () => {
        const argv = ['node', 'index.js'];
        expect(() => checkArguments(argv)).toThrow('Wrong format of input arguments');
    });

    test('throws an error for invalid flag when 5 arguments are provided', () => {
        const argv = ['node', 'index.js', 'inputFile', '--invalidFlag', 'outputFile'];
        expect(() => checkArguments(argv)).toThrow('Wrong format of input arguments');
    });

    test('throws an error for invalid flag when 4 arguments are provided', () => {
        const argv = ['node', 'index.js', 'inputFile', '--invalidFlag'];
        expect(() => checkArguments(argv)).toThrow('Wrong format of input arguments');
    });

    test('does not throw an error when valid flags are provided', () => {
        const argv1 = ['node', 'index.js', 'inputFile', '--out', 'outputFile'];
        const argv2 = ['node', 'index.js', 'inputFile', '--format=ansi'];
        const argv3 = ['node', 'index.js', 'inputFile', '--format=html'];
        expect(() => checkArguments(argv1)).not.toThrow();
        expect(() => checkArguments(argv2)).not.toThrow();
        expect(() => checkArguments(argv3)).not.toThrow();
    });
});

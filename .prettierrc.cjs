module.exports = {
    tabWidth: 4,
    semi: true,
    bracketSpacing: true,
    printWidth: 130,
    arrowParens: 'avoid',
    singleQuote: true,
    trailingComma: 'all',
    overrides: [
        {
            files: '*.svg',
            options: {
                parser: 'html',
                htmlWhitespaceSensitivity: 'ignore',
            },
        },
    ],
}

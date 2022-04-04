module.exports = {
    env: {
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        // use 4 space indentations
        indent: [2, 4],
        // be tolerant of Windows-style CRLF line endings
        'linebreak-style': 0,
        // allow console.log
        'no-console': 0,
    },
    root: true,
};

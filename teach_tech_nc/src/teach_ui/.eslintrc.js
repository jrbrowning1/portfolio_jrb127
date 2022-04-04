module.exports = {
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    parserOptions: {
        parser: 'babel-eslint',
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

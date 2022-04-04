module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '^/api': {
                // local (dev) server
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
};

module.exports = {
    entry: {
        hype: [
            './hype/styles.css',
            './hype/scripts'
        ],
        main: [
            './main/styles.css',
            './main/scripts'
        ]
    },
    output: {
        path: __dirname + '/public/build',
        filename: '[name].bundle.js',
        publicPath: '/build'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /impress\.js/,
                loader: 'exports?window.impress'
            }
        ]
    },
    devServer: {
        contentBase: './public',
        inline: true
    }
};

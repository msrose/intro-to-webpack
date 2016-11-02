module.exports = {
    entry: [
        './hype/styles.css',
        './hype/scripts'
    ],
    output: {
        path: __dirname + '/public/build',
        filename: 'bundle.js',
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

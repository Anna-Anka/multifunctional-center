export default {
    entry: {
        main: './src/js/main.js',
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
    },

    devtool: 'cheap-source-map',

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'main',
                    enforce: true,
                },
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { modules: false }],
                        ],
                    },
                },
            },
        ],
    },
};
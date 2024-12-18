export default {
    entry: {
        main: './src/js/main.js',
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
    },

    externalsType: 'script',

    externals: {
        ymaps3: ['https://api-maps.yandex.ru/v3/?apikey=5e824dbc-8855-473a-8c31-de0cc93c4481&lang=ru_RU', 'ymaps3']
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
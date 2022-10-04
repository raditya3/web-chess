const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const chunkLoadOrder = ['global', 'main', 'worker'];
/** @type {import('webpack').Configuration} */
const config = {
    mode: process.env.NODE_ENV || 'development',
    optimization: {
        usedExports: true,
        sideEffects: true,
    },
    entry: {
        main: './src/index.ts',
        global: './src/initialize-global.ts',
        worker: './src/web-worker.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devServer: {
        compress: true,
        port: 4400,
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',

                options: {
                    name: '[path][name].[ext]',
                    publicPath: '/',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunksSortMode: (a, b) => {
                if (chunkLoadOrder.indexOf(a) === chunkLoadOrder.indexOf(b)) {
                    return 0;
                }
                return chunkLoadOrder.indexOf(a) < chunkLoadOrder.indexOf(b)
                    ? -1
                    : 1;
            },
        }),
    ],
};

module.exports = config;

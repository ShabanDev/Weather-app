const path              = require('path');
let htmlWebpackPlugin   = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.tsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loader: 'pug-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'src/index.pug'
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
}
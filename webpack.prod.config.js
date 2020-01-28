let merge                   = require('webpack-merge');
let MiniCSSExtractPlugin    = require('mini-css-extract-plugin');
let commonConfig            = require('./webpack.common.config');

let prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(css|styl)$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'stylus-loader']
            }
        ]
    },
    plugins: [new MiniCSSExtractPlugin()]
};

module.exports = merge(commonConfig, prodConfig);
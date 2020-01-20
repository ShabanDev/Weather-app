let merge           = require('webpack-merge');
let path            = require('path');
let commonConfig    = require('./webpack.common.config');

let devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, 'dist'),
        index: 'index.html' 
    }
};

module.exports = merge(commonConfig, devConfig);
let merge           = require('webpack-merge');
let commonConfig    = require('./webpack.common.config');

let prodConfig = {
    mode: 'production'
};

module.exports = merge(commonConfig, prodConfig);
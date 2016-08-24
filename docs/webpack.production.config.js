const webpack = require('webpack');
const clone = require('clone');
const baseConfig = require('./webpack.config');

// merge configs
const prodConfig = clone(baseConfig);

prodConfig.devtool = 'none';

// merge plugins
prodConfig.plugins = baseConfig.plugins || [];
prodConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  output: {
    comments: false,
  },
}));

module.exports = prodConfig;

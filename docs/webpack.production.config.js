const webpack = require('webpack');
const clone = require('clone');
const baseConfig = require('./webpack.config');

process.env.NODE_ENV = 'production';

// merge configs
const prodConfig = clone(baseConfig);

prodConfig.devtool = 'none';

// merge plugins
prodConfig.plugins = baseConfig.plugins || [];
prodConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
}));
prodConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  output: {
    comments: false,
  },
}));

module.exports = prodConfig;

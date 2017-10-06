'use strict';

/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'LocaleTextdomain';
let fileName = 'locale-textdomain';

let plugins = [], outputFile, entry;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = fileName + '.min.js';
  entry = __dirname + '/src/index.js';
} else {
  entry = {
      'locale-textdomain': __dirname + '/src/index.js',
      tester: [ __dirname + '/src/tester.js' ]
  };
  outputFile = '[name].js';
  libraryName = 'Tester';
}

const config = {
  entry: entry,
  devtool: 'source-map',
  target: 'node',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;

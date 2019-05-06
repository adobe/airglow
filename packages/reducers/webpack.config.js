/*
 * ************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *   Copyright 2016 Adobe Systems Incorporated
 *   All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by all applicable intellectual property
 * laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ************************************************************************
 */

const path = require('path');
const webpack = require('webpack');

const PROD = JSON.parse(process.env.NODE_ENV === 'production' || '0');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
];

if (PROD) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  );
}

module.exports = {
  entry: {
    index: './src/index'
  },
  devtool: 'source-map',
  output: {
    filename: PROD ? '[name].min.js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel'
      }
    ]
  },
  plugins
};

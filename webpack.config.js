const path = require('path');

const root = __dirname;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'bundle.css',
});

module.exports = {
  entry: path.resolve(root, 'src/index.js'),
  output: {
    filename: '[hash:8].bundle.min.js',
    path: path.resolve(root, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000,
              name: 'images/[hash:8].[name].[ext]',
            },
          },
          'image-webpack-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 40000,
            name: 'font/[hash:8].[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'isomorphic-fetch',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'src/index.html'),
      // favicon: path.resolve(root, 'src/favicon.ico'),
    }),
    extractPlugin,
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        drop_console: true,
      },
    }),
  ],
  resolve: {
    alias: {
      constant: path.join(__dirname, 'src/js/constant'),
      utils: path.join(__dirname, 'src/js/utils'),
    },
  },
};

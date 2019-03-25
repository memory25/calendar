const path = require('path');

const root = __dirname;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractPlugin = new ExtractTextPlugin({
  filename: 'bundle.css',
  disable: false,
});

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.resolve(root, 'src/index.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(root, 'dist'),
    publicPath: '/',
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(root, 'dist'),
    publicPath: '/',
    port: 8010,
    historyApiFallback: true,
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
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 5 versions'],
                }),
              ],
            },
          },
          'sass-loader',
        ],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    alias: {
      constant: path.join(__dirname, 'src/js/constant'),
      utils: path.join(__dirname, 'src/js/utils'),
    },
  },
};

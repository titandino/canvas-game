const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index',
  output: {
    filename:'compiled.js',
    path:'./build'
  },
  // plugins: [
  //   new HTMLPlugin({
  //     template: './app/index.html'
  //   }),
  //   new ExtractTextPlugin('./app/css/style.css')
  // ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      }
    ],
  }
};

const HTMLPlugin = require('html-webpack-plugin');

const plugins = [
  new HTMLPlugin({
    template: './app/index.html',
  })
];

module.exports = {
  entry: './app/index',
  output: {
    filename:'compiled.js',
    path:'./build'
  },
  plugins,
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
        loader: 'css',
      }
    ],
  }
};

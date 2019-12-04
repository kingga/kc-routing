const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  entry: './main.ts',
  mode: 'development',
  output: {
    filename: 'web.js',
    publicPath: './dist/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
        ],
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'base64-inline-loader',
      },
    ],
  },
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.vue'],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};

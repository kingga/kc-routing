const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  entry: './main.ts',
  mode: 'production',
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
        loader: 'vue-loader',
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
        use: [
          {
            loader: 'base64-inline-loader',
            // loader: 'file-loader',
            // options: {
            //   name: '[name].[ext]',
            //   outputPath: './dist/fonts/',
            // },
          },
        ],
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

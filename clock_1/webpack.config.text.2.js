import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|pages)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { import: true, sourceMap: true },
          },
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin()
  ],
  devtool: 'eval-cheap-module-source-map',
  // devtool: 'source-map',// scss로 화면을 볼 경우
  target: 'web',
  devServer: {
    // contentBase: path.resolve(dirname, 'dist'),
    // compress: true,
    // hot: false,
    // historyApiFallback: true,
    // liveReload: true,
    // open: true,
    // port: 5500,
    // watchContentBase: true,
    // watchOptions: {
    //   poll: 1000,
    //   ignored: /node_modules/,
    // },
    static: {
      directory: path.join(dirname, 'dist'),
    },
    port: 9000,
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};

export default config;
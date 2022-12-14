// import fs from 'file-system';
import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// let htmlPageNames = [];
// const pages = fs.readdirSync('./src');
// pages.forEach(page => {
//   if (page.endsWith('.html')) {
//     htmlPageNames.push(page.split('.html')[0])
//   }
// });
// let multipleHtmlPlugins = htmlPageNames.map(name => {
//   return new HtmlWebpackPlugin({
//     template: `./src/${name}.html`,
//     filename: `${name}.html`, 
//     chunks: [`${JSON.stringify(name)}`]
//   })
// });


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
    // ...multipleHtmlPlugins,
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
  ],
  devtool: 'eval-cheap-module-source-map',
  // devtool: 'source-map',// scss로 화면을 볼 경우
  target: 'web',
  devServer: {
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
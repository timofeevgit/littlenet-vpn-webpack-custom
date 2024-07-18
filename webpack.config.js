const path = require('path');
// const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
// const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  module: {
    // в rules описываем правила обработки файлов при сборке
    rules: [
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.(js|jsx)$/,
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: /node_modules/,
        // при обработке этих файлов нужно использовать babel-loader
        use: ['babel-loader']
      },
      {
        test: /\.(tj)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader,
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
        'postcss-loader']
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource'
      }
    ]
  },
  mode: 'development',
  plugins: [
    // new ESLintPlugin({
    //   extensions: ['.js', '.jsx', '.ts', '.tsx']
    // }), // todo: download & enable ESLint 
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // new Dotenv(), // todo: research
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/styles/index.css', // todo: fix path
  }),
  ],
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.png',
      '.svg',
      '.jpg'
    ],
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@ui-pages': path.resolve(__dirname, './src/components/ui/pages'),
      '@utils-types': path.resolve(__dirname, './src/utils/types'),
      '@api': path.resolve(__dirname, './src/utils/burger-api.ts'),
      '@slices': path.resolve(__dirname, './src/services/slices'),
      '@selectors': path.resolve(__dirname, './src/services/selectors')
    }
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  }
};
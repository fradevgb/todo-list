const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', //Modo de ambiente : ("production" | "development"|"none")

  output: {
    clean: true, //Limpiar los archivos de salida(dist)
    filename: 'main.[contenthash].js',
  },

  module: {
    rules: [
      {
        test: /\.html$/i, //Agregar en el bundle los archivos html
        loader: 'html-loader',
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/i,
        exclude: /styles\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /styles\.css$/i,
        use: [MiniCssExtract.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizer(), new Terser()],
  },

  plugins: [
    new HtmlWebpack({
      //Configuracion del bundle para los archivos html(dist)
      title: 'Mi Webpack App',
      // filename:'index.html'
      template: './src/index.html',
    }),

    new MiniCssExtract({
      filename: '[name].[fullhash].css',
      ignoreOrder: false,
    }),

    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets/' }],
    }),
  ],
};

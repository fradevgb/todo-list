const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', //Modo de ambiente : ("production" | "development"|"none")

  output: {
    clean: true, //Limpiar los archivos de salida(dist)
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
    ],
  },

  optimization: {},

  plugins: [
    new HtmlWebpack({
      //Configuracion del bundle para los archivos html(dist)
      title: 'Mi Webpack App',
      // filename:'index.html'
      template: './src/index.html',
    }),

    new MiniCssExtract({
      // filename: '[name].[fullhash].css',
      filename: '[name].css',
      ignoreOrder: false,
    }),

    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets/' }],
    }),
  ],
};

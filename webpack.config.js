const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',

    entry: './src/app.js',

    output: {
      filename: isProduction ? 'bundle.[contenthash].js' : '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: isProduction ? {
          collapseWhitespace: true,
          removeComments: true,
        } : false,
      }),
      new CleanWebpackPlugin(),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};

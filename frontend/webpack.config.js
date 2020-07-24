const path = require('path')
const webpack = require('webpack')

module.exports = (env) => {
  const environmentConfig = require(`./config/env/${env.mode}.js`)

  return {
    // envファイルによってdevelopment, production等に分ける
    mode: env.mode,

    // 入出力ファイル設定
    entry: [path.resolve(__dirname, './src/index.tsx')],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // モジュール設定
    module: {
      rules: [
        {
          // ts-loaderの設定
          test: /\.(js|ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          // css-loaderの設定
          test: /\.(css|scss)?$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[local]',
                },
              },
            },
            // 'postcss-loader', 'sass-loader'
          ],
        },
      ],
    },

    // モジュール解決
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    // プラグイン設定
    plugins: [
      // configファイルのprocess.env.xxxを設定
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(environmentConfig),
      }),
    ],

    // 開発モード設定
    devtool: 'source-map',
    devServer: {
      contentBase: './dist',
      host: '0.0.0.0',
      port: 3000,
      disableHostCheck: true,
    },
  }
}

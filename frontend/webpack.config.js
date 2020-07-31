const path = require('path')
const webpack = require('webpack')

module.exports = (env, { mode }) => {
  const environmentConfig = require(`./config/env/${mode}.js`)
  // console.log(env)

  return {
    mode: mode,

    entry: [path.resolve(__dirname, './src/index.tsx')],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    module: {
      rules: [
        {
          test: /\.(js|ts|tsx|jsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
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
        {
          test: /\.(png|jpe?g|jpeg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192, // base64URLにする画像の大きさ
                fallback: require.resolve('responsive-loader'),
                adapter: require('responsive-loader/sharp'),
                // eslint-disable-next-line no-magic-numbers
                sizes: [300, 600, 1080, 1920],
                placeholder: true, // Progressive Imageで使う縮小画像を生成するかどうかのフラグ
                placeholderSize: 50, // 縮小画像のサイズ
                outputPath: 'images/',
                name: '[name]-[width].[ext]',
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(environmentConfig),
      }),
    ],

    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      host: '0.0.0.0',
      port: 3000,
      disableHostCheck: true,
    },
  }
}

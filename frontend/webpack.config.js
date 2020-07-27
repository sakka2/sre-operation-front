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
      ],
    },

    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@lib': path.resolve(__dirname, 'src/lib'),
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

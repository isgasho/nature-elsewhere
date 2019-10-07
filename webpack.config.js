const childProcess = require('child_process')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {version} = require('./package.json')
const webpack = require('webpack')

/** @return {webpack.Configuration} */
module.exports = () => {
  const [date, hash] = childProcess
    .execSync('git -P log -1 --date=format:%F --format=%ad,%h')
    .toString()
    .trim()
    .split(',')

  return {
    stats: 'errors-warnings',

    resolve: {extensions: ['.js', '.ts']},

    module: {
      rules: [
        {test: /\.ts$/, use: 'ts-loader'},
        {test: /\.glsl$/, use: 'raw-loader'}
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin([
        {context: 'src', from: '{**/*.{css,html,png},manifest.json}'}
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          date: JSON.stringify(date),
          version: JSON.stringify(version),
          hash: JSON.stringify(hash)
        }
      })
    ],

    devServer: {
      clientLogLevel: 'warning',
      overlay: {warnings: true, errors: true},
      stats: 'errors-warnings'
    }
  }
}
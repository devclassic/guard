const MinimizerPlugin = require('minimizer-webpack-plugin')

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new MinimizerPlugin({
        parallel: true,
        extractComments: false,
        minimizerOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
}

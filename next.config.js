const withCSS = require('@zeit/next-css')
// const withPurgeCss = require('next-purgecss') does not work with tailwind at this moment
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = withCSS({
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    if (config.mode === 'production') {
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))
      }
    }
    return config
  }
})

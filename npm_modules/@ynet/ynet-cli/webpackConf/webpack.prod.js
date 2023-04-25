const merge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = merge(webpackBaseConf, {
	mode: 'production',
	output: {
		filename: '[name].js',
		publicPath: '../'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true
		}),
		new OptimizeCSSPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				safe: true,
				discardComments: { removeAll: true }
			},
			canPrint: true
		})
	]
})
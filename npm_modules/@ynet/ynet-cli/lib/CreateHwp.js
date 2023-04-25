const { resolve } = require('../helper')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BaseModules = require('./BaseModules')
module.exports = function(title, fileName, inject){
	const { env } = BaseModules.command
	const { template } = BaseModules.appConf

	const minify = env === 'dev' ? Object.create(null) : {
		collapseWhitespace: true,
		removeAttributeQuotes: true,
		minifyJS: true, minifyCSS: true
	}
	return new HtmlWebpackPlugin({
		title, minify, chunks: ['vendor','manifest', fileName],
		chunksSortMode: 'manual', template: resolve(template),
		filename: `${fileName}.html`, injectJS: inject.injectJS, injectCSS: inject.injectCSS
	})
}
const path = require('path')
const merge = require('webpack-merge')
const { resolve, exists } = require('../helper')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BaseModules = require('./BaseModules')

const { env } = BaseModules.command
const { babelrc, postcssrc, sassResources, src, theme, beforeHtmlParse, beforeJsparse } = BaseModules.appConf

const userBabelrc = exists(babelrc) ? require(resolve(babelrc)) : {}
const userPostcssrc = exists(postcssrc) ? require(resolve(postcssrc)): {}
const defaultBabelrc = require(path.join(__dirname, '../babel.config'))
const defaultPostcssrc = require(path.join(__dirname, '../postcss.config'))
const _babelrc = merge({}, defaultBabelrc, userBabelrc)
const _postcssrc = merge({}, defaultPostcssrc, userPostcssrc)


const otherLoader = {
	'NormalLoaders': [
		{ test: /\.vue$/, use: [{loader: 'vue-loader'}] },
		{
			test: /\.(png|jpe?g|gif)$/,
			use({resourceQuery}){
				return resourceQuery === '?base64' ? 
				{loader:'url-loader',options:{limit:100000}} : 
				{loader: 'file-loader',options: {name: 'img/[name].[contenthash:7].[ext]'}}
			}
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: [{loader:'file-loader',options:{name: 'font/[name].[contenthash:7].[ext]'}}]
		},
		{
			test: /\.(svg)(\?.*)?$/,
			use: [{loader:'file-loader',options:{name: 'svg/[name].[contenthash:7].[ext]'}}]
		}
	],
	'CommonLoaders': [
		{ test: /\.vue$/, use: [{loader: 'vue-loader' }] },
		{
			test: /\.(png|jpe?g|gif)$/,
			use: [{loader:'url-loader',options:{limit:10000000}}]
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: [{loader:'url-loader',options:{limit:10000000}}]
		},
		{
			test: /\.(svg)(\?.*)?$/,
			use: [{loader:'url-loader',options:{limit:10000000}}]
		}
	]
}


if(beforeHtmlParse){
	otherLoader.NormalLoaders.push({
		resourceQuery: /^\?vue&type=template/,
		loader: resolve(__dirname, '../loader/sfc-loader/template-loader')
	})
}

if(beforeJsparse){
	otherLoader.NormalLoaders.push({
		resourceQuery: /^\?vue&type=script/,
		loader: resolve(__dirname, '../loader/sfc-loader/script-loader')
	})
}

const baseLoader = function(loaderType){
	const baseJsLoader = {
		test: /\.js$/,
		use: [{loader: 'babel-loader', options: _babelrc }]
	}
	const baseCssLoader = [
		{ loader: 'css-loader', options: { sourceMap: false } },
		{ loader: 'postcss-loader', options: _postcssrc }
	]
	if(loaderType === 'NormalLoaders'){
		baseJsLoader.include = [resolve(src), resolve('node_modules/@ynet')]
	}else{
		baseJsLoader.exclude = /node_modules/
	}
	return {
		baseJsLoader, baseCssLoader
	}
}

const extractLoader = function(use, loaderType){
	if(loaderType === 'CommonLoaders'){
		return ExtractTextPlugin.extract({
			use, fallback: 'vue-style-loader'
		})
	}
	return env === 'dev' ? 
	[{loader:'style-loader',options:{singleton:true}}].concat(use) : 
	ExtractTextPlugin.extract({
		use, fallback: 'vue-style-loader'
	})
}

const generateSassResourceLoader = function(baseCssLoader, loaderType){
	const use = [
		...baseCssLoader,
		'sass-loader'
	]
	if(sassResources){
		use.push({
			loader: 'sass-resources-loader',
			options: { resources: [resolve(sassResources)] }
		})
	}
	return extractLoader(use, loaderType)
}


const generateLoaders = function(baseCssLoader,loaderType){
	const loaders = function(loader){
		const use = [...baseCssLoader]
		if(loader){
			let _loader = {
				loader: loader + '-loader',
				options: { sourceMap: false }
			}
			if(loader === 'stylus' && theme && loaderType === 'NormalLoaders'){
				_loader.options.import = [resolve(theme)]
			}
			use.push(_loader)
		}
		return extractLoader(use, loaderType)
	}
	return {
		css: loaders(),
		less: loaders('less'),
		sass: generateSassResourceLoader(baseCssLoader, loaderType),
		scss: generateSassResourceLoader(baseCssLoader, loaderType),
		styl: loaders('stylus'),
		stylus: loaders('stylus')
	}
}

module.exports = function(loaderType = 'NormalLoaders'){
	const loader = [...otherLoader[loaderType]]
	const { baseJsLoader, baseCssLoader } = baseLoader(loaderType)
	const _generateLoaders = generateLoaders(baseCssLoader, loaderType)
	for(let extension in _generateLoaders){
		const use = _generateLoaders[extension]
		loader.push({
			test: new RegExp('\\.' + extension + '$'),
			use
		})
	}
	return [baseJsLoader,...loader]
}
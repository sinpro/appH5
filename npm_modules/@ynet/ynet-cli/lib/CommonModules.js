const { resolve } = require('../helper')
const path = require('path')
const BaseModules = require('./BaseModules') 
const webpack = require('webpack')
const _ = require('lodash')
const replaceChunk = require('../plugins/replaceChunk')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const loader = require('./LoaderModules')
// const merge = require('webpack-merge')


module.exports = new class {
	constructor(){
		this.commonMap = require(resolve(BaseModules.appConf.commonModules, 'conf'))
		this.externals = this._createExternals()
		this.injectAssets = this._createInject()
		this.commonWebpackConf = this._createCommonWebpackConf()
	}

	_transformFilename(filename){
		const { env } = BaseModules.command
		return env === 'dev' ? `${filename}` : `${filename}.min`
	}

	_transformOutputPath(filename){
		filename = this._transformFilename(filename)
		const { env, server } = BaseModules.command
		const { location } = BaseModules
		if(env === 'dev'){
			return '/' + filename
		}

		if(server){
			return `/${location.base}/${filename}`
		}

		return path.format(location) + '/' + filename
	}

	_createExternals(){
		return _.transform(this.commonMap, (result, value, key) => {
			if(!value.type || value.type != 'css'){
				if(value.exports && value.exports.length > 0){
					value.exports.forEach(lib => {
						result[lib] = key + '("'+ lib + '")'
					})
				}else{
					result[key] = key + '()'
				}
			}
		})
	}

	_createInject(){
		const { env, debug } = BaseModules.command
		return _.transform(this.commonMap, (result, value, key) => {
			const filename = this._transformOutputPath(value.output || key)
			if(value.type && value.type === 'css'){
				result.injectCSS.push(filename)
			}else if(value.required === true){
				result.injectJS.push(filename)
			}
		}, {
			injectJS: (env === 'dev' || debug) ? ['/vconsole.min'] : [],
			injectCSS: []
		})
	}

	_createAutoScript(){
		return _.transform(this.commonMap, (result, value, key) => {
			if(!value.type || value.type != 'css'){
				if(value.exports && value.exports.length > 0){
					value.exports.forEach(lib => {
						result[lib] = this._transformOutputPath(value.output || key)
					})
				}else{
					result[key] = this._transformOutputPath(value.output || key)
				}
			}
		})
	}

	_createCommonWebpackConf(){
		const { env } = BaseModules.command
		const { output, alias = {} } = BaseModules.appConf
		const { plugins, ...other } = BaseModules.baseWebackConf

		return _.transform(this.commonMap, (result, value, key) => {
			const conf = Object.assign({},
				other,
				{
					module:{ noParse: [/\.min\.js$/], rules: loader('CommonLoaders') },
					entry: {}, optimization:{},
					plugins: [
						...plugins,
						new webpack.DefinePlugin({
							'bundleStat': JSON.stringify(BaseModules.createBundleStat()),
							'bundleId': JSON.stringify(BaseModules.createAppList())
						}),
						new ExtractTextPlugin({
							filename: '[name].css'
						})
					],
					output: {
						path: env === 'dev' ? resolve(output) : resolve(output, BaseModules.location.base),
						filename: '[name].js',
						publicPath: '/',
						libraryExport: 'default',
						libraryTarget: 'umd',
						library: key
					},
					resolve: {
						extensions: other.resolve.extensions,
						alias: {
							'@m': resolve(BaseModules.appConf.commonModules),
							...alias,
							...other.resolve.alias
						}
					}
				}
			)
			conf.entry[this._transformFilename(value.output || key)] = resolve(BaseModules.appConf.commonModules, key)
			if(value.type && value.type == 'css'){ conf.plugins.push(new replaceChunk()) }
			result.push(conf)
		}, [])
	}
}




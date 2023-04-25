const { resolve } = require('../helper')
const _ = require('lodash')
const path = require('path')
const merge = require('webpack-merge')
const BaseModules = require('./BaseModules')
const CommonModules = require('./CommonModules')
const CreateHwp = require('./CreateHwp')
const loader = require('./LoaderModules')
const fixtAssetsPath = require('../plugins/fixtAssetsPath')
// const autoInjectJS = require('../plugins/autoInjectJS')



module.exports = new class {
	constructor(){
		this.normalWebpackConf = this._createNormalWebpackConf()
	}

	_createNormalWebpackConf(){
		const { env } = BaseModules.command
		const { output, src, alias = {} } = BaseModules.appConf
		const { plugins: basePlugins = [], ...baseOther } = BaseModules.baseWebackConf
		const { plugins: userPlugins = [], ...userOther } = BaseModules.userEnvConf.webpackConfig || {}
		return _.transform(BaseModules.bundleMap, (result1, value1, key1) => {
			const conf = merge({},
				baseOther,
				{
					externals: CommonModules.externals,
					module:{ noParse: [/\.min\.js$/], rules: loader('NormalLoaders') },
					entry: {},
					output: {
						path: env === 'dev' ? resolve(output) : resolve(output, key1),
					},
					resolve: {
						alias: {
							'@m': resolve(src, 'modules', key1)
						}
					},
					plugins: [
						...basePlugins,
						...userPlugins,
						new fixtAssetsPath()
						// new autoInjectJS(CommonModules.commonMap, BaseModules.command, BaseModules.location)
					]
				},
				userOther
			)
			_.transform(value1, (result2, value2, key2) => {
				_.transform(value2, (result3, value3, key3) => {
					const chunkNmae = env !== 'dev' ? `${key2}/${key3}` : `${key1}/${key2}/${key3}`
					const { title = '' } = value3
					conf.entry[chunkNmae] = resolve(src, 'modules', key1, key2, key3, 'main')
					conf.plugins.unshift(CreateHwp(title, chunkNmae, CommonModules.injectAssets))
				})
			})
			result1.push(conf)
		}, [])
	}
}
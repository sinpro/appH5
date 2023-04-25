const { resolve, command } = require('../helper')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const _ = require('lodash')
const fs = require('fs')


module.exports = new class {
	constructor(){
		//命令行内的用户参数
		this.command = command()
		//项目配置文件
		this.appConf = require('./AppConfig')
		//所有离线包的配置信息
		this.bundleMap = this._createBundleMap()
		//项目环境文件, dev, prod, sit, uat
		this.userEnvConf = this._createUserEnvConf()
		//虚拟域名和工作空间格式化
		this.location = this._createLocation()
		//脚手架内基础配置 dev, prod
		this.baseWebackConf = this._createWebpackBaseConf()
		//取出约定参数设置到process.env
		this._createProcessEnv()

		this.vconsoleSource = this._vconsoleSource()
	}

	_createBundleConf(){
		const glob = require('glob')
		const { modules } = this.command
		const { src } = this.appConf
		return modules.length <=0 ? 
		glob.sync(resolve(src, 'modules', '*', 'conf.json')) :
		modules.map(dir => resolve(src, 'modules', dir,'conf.json'))
	}

	_createBundleMap(){
		const bundleMap = this._createBundleConf().reduce((pre, cur) => {
			const { dir } = path.parse(cur)
			const bundleName = path.basename(dir)
			pre[bundleName] = require(cur)
			return pre
		}, {})
		this.command.modules = Object.keys(bundleMap)
		return bundleMap
	}

	_createUserEnvConf(){
		const { env } = this.command
		const { envConf } = this.appConf
		return require(resolve(envConf,`${env}.env`))
	}

	_createLocation(){
		const { env } = this.command
		if(env === 'dev'){
			return {
				protocol: '',
				base: '/'
			}
		}
		const { virtualHost = '', workspace = '', version = '' } = this.userEnvConf
		const [origin, protocol = '', host = ''] = virtualHost.match(/(h?t?t?p?s?:?\/?\/)(.*)$/)
		return {
			root: protocol,
			base: path.posix.join(host, workspace, version)
		}
	}

	_createWebpackBaseConf(){
		const { platform, debug, mock, env } = this.command
		const webpackEnvConf = require(`../webpackConf/webpack.${env == 'dev' ? 'dev' : 'prod'}`)
		return merge({},
			webpackEnvConf,
			{
				plugins: [
					new webpack.DefinePlugin(this.userEnvConf.envConfig),
					new webpack.DefinePlugin({
						'process.env.PLATFORM': JSON.stringify(platform),
						'process.env.DEBUG': JSON.stringify(!!debug),
						'process.env.MOCK': JSON.stringify(!!mock)
					})
				]
			}
		)
	}

	_createProcessEnv(){
		const { platform, debug } = this.command
		process.env.PLATFORM = platform
		process.env.DEBUG = debug
	}

	createBundleStat(){
		return _.transform(this.bundleMap, (result1, value1, key1) => {
			_.transform(value1, (result2, value2, key2) => {
				_.transform(value2, (result3, value3, key3) => {
					const { title, ...other } = value3
					if(_.isEmpty(other) === false){
						result1[`${key1}/${key2}/${key3}`] = other
					}
				})
			})
		})
	}

	createAppList(){
		const bundleInfo = require(resolve(this.appConf.bundleInfo))
		return _.transform(bundleInfo, (result, value, key) => {
			result[key] = value.id
		})
	}

	_vconsoleSource(){
		const { env, debug } = this.command
		if(env === 'dev' || debug){
			const sourcePath = require.resolve('vconsole')
			const source = fs.readFileSync(sourcePath)
			return source + ';window.VConsole = new VConsole()'
		}
		return ''
	}
}





const { errHandle, AsyncSeriesWaterfallHook } = require('../helper')
const rm = require('rimraf')
const webpack = require('webpack')
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const queue = AsyncSeriesWaterfallHook()

module.exports = class {
	constructor(normalWebpackConf){
		this.cur = 0
		this.normalWebpackConf = normalWebpackConf
		this.size = normalWebpackConf.length
		this.spinner = ora(chalk.cyan.bold(` ${this.cur}/${this.size} normal bundle build....`)).start()
	}

	_createCompileQueue(){
		this.normalWebpackConf.forEach(conf => {
			queue.tapAsync((data = [], next) => {
				rm(conf.output.path, err => {
					webpack(conf, (err, stats) => {
						this._updateSpinner()
						const _data = [...data,{err, stats, bundleName: path.basename(conf.output.path)}]
						next(null, _data)
					})
				})
			})
		})

		if(this.size === 1){
			this._createQueueSingle()
		}else if(this.size > 1){
			this._createQueueMultiple()
		}else{
			this._reject()
		}
	}


	_createQueueSingle(){
		queue.tapAsync((data=[], next) => {
			this.spinner.stop()
			process.stdout.write(data[0].stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false
			}) + '\n\n')

			if(!errHandle(data[0].err, data[0].stats)){
				this._resolve()
			}else{
				this._reject()
			}
		})
	}

	_createQueueMultiple(){
		queue.tapAsync((data, next) => {
			this.spinner.stop()
			this._resolve(data)
		})
	}

	_updateSpinner(){
		this.spinner.text = chalk.cyan.bold(` ${++this.cur}/${this.size} normal bundle build....`)
	}

	compile(){
		return new Promise((resolve, reject) => {
			this._resolve = resolve
			this._reject = reject
			this._createCompileQueue()
			queue.callAsync()
		})
	}
}
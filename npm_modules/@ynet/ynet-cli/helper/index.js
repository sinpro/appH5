const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')

exports.command = function(){
	if(exports.command.cache){ return exports.command.cache }
	const [run, env, ...args] = JSON.parse(process.env.npm_config_argv).original
	const userArgs = {
		platform: '', modules: [], env: 'dev'
	}
	for(let arg of _.union(process.argv.splice(2), args)){
		if(/^\-\-/.test(arg)){
			let [key, val = true] = arg.split('=')
			key = key.replace(/\-\-/, '')
			userArgs[key] = val
		}else{
			userArgs.modules.push(arg)
		}
	}
	exports.command.cache = userArgs
	return userArgs
}

exports.resolve = function(...arg){
	const _path = path.join(...arg)
	return path.isAbsolute(_path) ? _path : path.join(process.cwd(), _path)
}

exports.errHandle = function(err, stats, print=true){
	if(err){
		print && console.error(chalk.red.bold(err.stack || err))
		if(err.details){
			print && console.error(chalk.red.bold(err.details)) 
		}
		return err.details || err.stack || err
	}
	const info = stats.toJson()
	if(stats.hasErrors()){
		print && console.error(chalk.red.bold(info.errors))
		return info.errors
	}
	if(stats.hasWarnings()){
		print && console.error(chalk.yellow.bold(info.warnings))
	}

	return null
}

exports.getIPAdress = function(){
	const interfaces = require('os').networkInterfaces()
	for(const devName in interfaces){
		const iface = interfaces[devName]
		for(let i=0;i<iface.length;i++){
			const alias = iface[i]
			if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
				// console.log(`工作IP为：${alias.address}`)
				return alias.address
			}
		}
	}
}

exports.exists = function(url){
	if(!url){ return false }
	url = exports.resolve(url)
	return fs.existsSync(url) ? url : false
}

exports.interceptVconsole = function(app, source){
	app.get('/vconsole.min.js', (req, res) => {
		res.send(source)
	})
}

exports.AsyncSeriesWaterfallHook = function(){
	const tasks = []
	return {
		tapAsync(task){
			tasks.push(task)
		},
		callAsync(callback = () => {}){
			let i = 0,size = tasks.length
			let next = (err, data) => {
				if(err) return  callback(err)
				let task = tasks[i++]
				if(task){
					if(i == 0){
						task([], next)
					}else{
						task(data, next)
					}
				}else{
					callback(err, data)
					tasks = null
				}
			}
			next()
		}
	}
}

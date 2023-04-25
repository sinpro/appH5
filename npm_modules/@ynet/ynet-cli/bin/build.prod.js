#!/usr/bin/env node

const express = require('express')
const chalk = require('chalk')
const { interceptVconsole, resolve } = require('../helper')
const BaseModules = require('../lib/BaseModules')
const NormalModules = require('../lib/NormalModules')
const Task = require('../lib/Task')
const Stats = require('../lib/Stats')
const _Task = new Task(NormalModules.normalWebpackConf)

_Task.compile().then(res => {
	if(res){
		new Stats(res)
	}

	console.log(chalk.cyan.bold('  bundle build complete.\n'))
	console.log(chalk.yellow.bold(
		'  Tip: built files are meant to be served over an HTTP server.\n' +
		'  Opening index.html over file:// won\'t work.\n'
	))


	if(BaseModules.command.server){

		const { port } = BaseModules.appConf.devServer
		const app = express()
		if(BaseModules.command.debug){
			interceptVconsole(app, BaseModules.vconsoleSource)
		}
		app.use('/', express.static(resolve(BaseModules.appConf.output)))
		app.listen(port)
		console.log(chalk.yellow.bold('  > Starting dev server...' + '\n'))
		console.log(chalk.yellow.bold('  > Listening at localhost:' + port + '\n'))

	}

})


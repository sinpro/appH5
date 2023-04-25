#!/usr/bin/env node

const rm = require('rimraf')
const path = require('path')
const webpack = require('webpack')
const ora = require('ora')
const chalk = require('chalk')
const BaseModules = require('../lib/BaseModules')
const CommonModules = require('../lib/CommonModules')
const { errHandle } = require('../helper')

const outputPath = path.join(BaseModules.appConf.output, BaseModules.location.base.split('/')[0])
const spinner = ora(chalk.cyan.bold(' common bundle build....')).start()


rm(outputPath, err => {
	if (err) throw err
	webpack(CommonModules.commonWebpackConf, (err, stats) => {
		spinner.stop()
		if(!errHandle(err, stats)){
			console.log(chalk.bold.cyan('  common bundle build complete.\n'))
		}
	})
})
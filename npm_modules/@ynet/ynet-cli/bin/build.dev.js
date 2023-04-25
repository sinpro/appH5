#!/usr/bin/env node

const { getIPAdress, interceptVconsole } = require('../helper')
const chalk = require('chalk')
const webpack = require('webpack')
const merge = require('webpack-merge')
const WebpackDevServer = require('webpack-dev-server')
const { devServer } = require('../lib/AppConfig')
const BaseModules = require('../lib/BaseModules')
const CommonModules = require('../lib/CommonModules')
const NormalModules = require('../lib/NormalModules')


const compiler = webpack([
	...CommonModules.commonWebpackConf,
	...NormalModules.normalWebpackConf
])

const server = new WebpackDevServer(compiler, devServer)
interceptVconsole(server.app, BaseModules.vconsoleSource)
console.log('\n'+chalk.bold.yellow('  Work address: ' + getIPAdress())+'\n')
server.listen(devServer.port, devServer.host)


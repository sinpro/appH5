#!/usr/bin/env node

const { resolve } = require('../helper')
const _ = require('lodash')
const chalk = require('chalk')
const fse = require('fs-extra')
const { bundleMap, appConf, command } = require('../lib/BaseModules')
const bundleInfo = require(resolve(appConf.bundleInfo))
const output = resolve(appConf.output||'')

const appList = _.transform(bundleInfo, (result, value, key) => {
	result[key] = value.id
})

const pageInfo = _.transform(bundleMap, (result, value, key) => {
	_.transform(value, (result2, value2, key2) => {
		_.transform(value2, (result3, value3, key3) => {
			const { pushParam = {} } = value3
			if(_.isEmpty(pushParam) === false){
				result[`${key}/${key2}/${key3}`] = pushParam
			}
		})
	})
})

fse.outputJsonSync(`${output}/_releaseconf/pageInfo.json`, pageInfo)
fse.outputJsonSync(`${output}/_releaseconf/appList.json`, appList)


console.log(chalk.yellow.bold('  releaseConf build complete.\n'))

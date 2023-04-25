const BaseModules = require('../../lib/BaseModules')
const { beforeHtmlParse } =  BaseModules.appConf


module.exports = function(source){
	return beforeHtmlParse.call(BaseModules.userEnvConf.envConfig, source)
}

const BaseModules = require('../../lib/BaseModules')
const { beforeJsParse, userEnvConf } =  BaseModules.appConf


module.exports = function(source){
	return beforeJsParse.call(BaseModules.userEnvConf.envConfig, source)
}
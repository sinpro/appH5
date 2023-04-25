
let vueconfig = {}

if(process.env.TARGET == 'lib'){
    vueconfig = require('./vue.lib.config')
}else{
    vueconfig = require('./vue.example.config')
}

module.exports = vueconfig

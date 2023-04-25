


module.exports = {
    transpileDependencies: ['@ynet'],
    configureWebpack: config => {
        config.performance ={
            hints:false
        }
    }
}

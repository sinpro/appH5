const path = require('path')


module.exports = {

  template: path.join(__dirname,'template.html'),

  babelrc: path.join(__dirname, 'babelrc.config.js'),

  postcssrc: path.join(__dirname, 'postcssrc.config.js'),

  devServer: {
		proxy: {
            '/chee-mpaasService': {
                target: 'http://flameapp.cn',
                changeOrigin: true
            },
            '/inmanage_lb/': {
                target: 'http://flameapp.cn',
                changeOrigin: true
            }
        }
  }
}
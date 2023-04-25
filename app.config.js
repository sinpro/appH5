let path = require('path')
let glob = require('glob')

module.exports = {
  sassResources: 'src/common/cssBundle/vars.scss',
  theme: 'src/theme/index.styl',
  beforeHtmlParse (source) {
    return source
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'mock'),
    before: function (app) {
      //GET POST请求本地mock代理
      let mockPath = '/api'
      let filePaths = glob.sync(path.resolve(__dirname, 'mock/apis', '**', '*.js'))
      filePaths.forEach(filePath => {
        let {name} = path.parse(filePath), content = require(filePath)
        app.all(`${mockPath}/${name}`, function (req, res) {
          res.json(content)
        })
      })
    },
    proxy: {
      // // 远程代理
      // '/api': {
      //   // target: 'http://flameapp.cn/chee-mpaasService',
      //   target: 'http://111.204.125.243:8085/mobileApp-sit/',
      //   changeOrigin: true
      // }
    }
  }
}
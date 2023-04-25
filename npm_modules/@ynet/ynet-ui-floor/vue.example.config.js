


module.exports = {
    publicPath: './',
    outputDir: 'dist/floorexample',
    pages: {
        index: {
            entry: './example/main.js',
            template: './example/template.html',
            filename: 'index.html',
            title: '猎豹楼层组件库',
        }
    },
    transpileDependencies: ['@ynet'],
    css: {
        loaderOptions: {
            postcss: {
                plugins: () => [
                    require('autoprefixer')({ overrideBrowserslist: ['> 1%', 'last 2 versions', 'not ie <= 8'] }),
                    require('postcss-plugin-px2rem')({
                        rootValue: 100,
                        minPixelValue: 2,
                        selectorBlackList: [],
                        mediaQuery: true,
                        propBlackList: []
                    })
                ]
            }
        }
    }
}

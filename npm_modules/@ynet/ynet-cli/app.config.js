const path = require('path')


module.exports = {

	src: 'src',

	theme: '',

	sassResources: '',

	template: path.join(__dirname,'template.html'),

	postcssrc: path.join(__dirname,'postcss.config'),

	babelrc: path.join(__dirname,'babel.config'),

	envConf: 'config',

	commonModules: 'src/common',

	bundleInfo: 'config/bundleInfo',

	output: 'dist',

	devServer: {
		stats: {
			source: false,
			entrypoints: true,
			children: true,
			assets: false,
			colors: true,
			chunks: false,
			hash: true,
			modules: false,
			errors: true,
			errorDetails: true,
			warnings: true,
			moduleTrace: true,
			publicPath: true
		},
		host: '0.0.0.0',
		port: 8080,
		publicPath: '/',
		hot: true,
		disableHostCheck: true,
		historyApiFallback: false,
		noInfo: false,
		overlay: true,
		open: false
	}
}


module.exports = {
	"plugins": [
		require('autoprefixer')({overrideBrowserslist: ['last 20 Chrome versions', 'iOS >= 7','Android >= 4']}),
		require('postcss-plugin-px2rem')({
			rootValue: 100,
			minPixelValue: 2,
			selectorBlackList: [],
			mediaQuery: true,
			propBlackList: []
		})
	]
}

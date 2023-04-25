module.exports = {
	"presets": [
		["@babel/preset-env", {
			useBuiltIns: "usage",
			modules: false,
			debug: false,
			corejs: "3",
			targets: {
				browsers: ["last 2 versions","safari >= 7"]
			}
		}]
	],
	"plugins": [
		"@babel/plugin-transform-runtime", "lodash", "@babel/plugin-transform-modules-commonjs",
		["import", {
			"libraryName": "mand-mobile",
			"libraryDirectory": "components"
		}, 'mand-mobile'],
		["import", {
			"libraryName": "@ynet/ynet-components",
			"customName": name => `@ynet/ynet-components/src/components/${name}`,
			"camel2DashComponentName": false
		}, '@ynet/ynet-components']
	]
}
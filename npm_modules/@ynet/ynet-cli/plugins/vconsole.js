const { resolve } = require('../helper')
const { OriginalSource } = require('webpack-sources')
const Chunk = require('webpack/lib/Chunk')
const fs = require('fs')

module.exports = class {
	constructor(env){
		this.env = env
	}
	apply(compiler){
		if(this.env !== 'dev') return

		const vc = fs.readFileSync(resolve('node_modules/vconsole/dist/vconsole.min.js'), 'utf8')
		const sourceCode = vc + ';window.VConsole = new VConsole()'
		const fileName = 'vconsole.min.js'
		compiler.hooks.compilation.tap('compilation', compilation => {
			compilation.hooks.additionalAssets.tapAsync('additionalAssets', next => {
				compilation.assets[fileName] = new OriginalSource(
					sourceCode, fileName
				)
				const chunk = new Chunk('vconsole.min')
				chunk.files = [fileName]
				chunk.ids = []
				compilation.chunks.push(chunk)
				next()
			})
		})
	}
}
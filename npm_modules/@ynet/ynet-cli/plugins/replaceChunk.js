
module.exports = class {
	apply(compile){
		compile.hooks.shouldEmit.tap('my-shouldEmit', compilation => {
			const cssChunk = {}
			for(let k in compilation.assets){
				if(/\.css$/.test(k)){
					cssChunk[k] = compilation.assets[k]
				}
			}
			compilation.assets = cssChunk
			return true
		})
	}
}
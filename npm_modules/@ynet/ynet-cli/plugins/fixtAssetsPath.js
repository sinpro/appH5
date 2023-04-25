module.exports = class {
	apply(compiler){
		compiler.hooks.emit.tapAsync('my-fixAssetsPath', (compilation, next) => {
			for(let i in compilation.assets){
				if(/vendor\.css$/.test(i) || /manifest\.css$/.test(i)){
					if(compilation.assets[i]._value){
						let res = compilation.assets[i]._value
						res = res.replace(/url\(\.\.\/img\//g, 'url(./img/')
							.replace(/url\(\.\.\/svg\//g, 'url(./svg/')
							.replace(/url\(\.\.\/font\//g, 'url(./font/')
						compilation.assets[i]._value = res
					}
				}
			}
			next()
		})
	}
}
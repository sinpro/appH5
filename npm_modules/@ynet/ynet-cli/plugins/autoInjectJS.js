const path = require('path')
const _ = require('lodash')

let injectJS = null

module.exports = class {
	constructor(commonMap, command, location){
		this.originCommonMap = commonMap
		this.transformFilename = this._transformFilenameFn(command, location)
		this.commonMap = this._createCommonMap(commonMap)
		this.pageObject = Object.create(null)
	}

	_transformFilenameFn({env,server}, location){

		if(env === 'dev'){
			return function(filename){ return `/${filename}` }
		}

		if(server){
			return function(filename){ return `/${location.base}/${filename}.min` }
		}
		
		return function(filename){
			return path.format(location) + `/${filename}.min`
		}
		
	}

	_createCommonMap(map){
		return _.transform(map, (result, value, key) => {
			if(!value.required && (!value.type || value.type.toLowerCase() !== 'css')){
				const { output = key, deps = [] } = value
				if(value.exports && value.exports.length > 0){
					value.exports.forEach(v => result[v] = {output, deps})
				}else{
					result[key] = {output, deps}
				}
			}
		})
	}

	_createDeps(filename){
		let deps = []
		let depsFn = f => {
			const o = this.originCommonMap[f]
			deps.unshift(this.transformFilename(o.output || f))
			if(o && o.deps && o.deps.length > 0){
				deps.unshift(...o.deps.map(s => this.transformFilename(s)))
				o.deps.forEach(v => {
					depsFn(v)
				})
			}
		}
		depsFn(filename)
		return _.uniq(deps)
	}

	_createTempMap(chunkName, filename){
		const deps = this._createDeps(filename)
		const pageDeps = this.pageObject[chunkName]
		this.pageObject[chunkName] = pageDeps ? _.union(pageDeps, deps) : deps

	}

	apply(compiler){
		compiler.hooks.compilation.tap('my-compilation', compilation => {
			compilation.hooks.optimizeChunks.tap('my-optimize-chunks', chunks => {
				(compiler.options.mode !== 'production') && (this.pageObject = Object.create(null))
				chunks.forEach(chunk => {
					chunk._modules.forEach(module => {
						if(module.external && this.commonMap[module.userRequest]){
							this._createTempMap(chunk.name, module.userRequest)
						}
					})
				})
			})
			compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('my-generation', (e, t) => {
				if(injectJS === null){ injectJS = e.plugin.options.injectJS || [] }
				const path = e.plugin.options.filename.replace(/\.html$/, '')
				e.plugin.options.injectJS = [...injectJS, ...this.pageObject[path] || []]
				t(null, e)
			})
		})
	}
}
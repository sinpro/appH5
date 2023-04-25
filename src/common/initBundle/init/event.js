/**
 * //应用事件初始化
 * @param {Object} app 应用对象
 */
export default function (app){
    const vm = app.vm

    //vue生命周期触发
	const emitHook = function(vm, eventName, data = {}) {
		const _emit = _vm => {
			const child = _vm.$children
			const handlers = _vm.$options[eventName]
			if(handlers){
				if(handlers.apply){
					handlers.call(_vm, ...[...arguments].slice(2))
				}else{
					for(let i = 0, j = handlers.length; i < j; i++){
						handlers[i].call(_vm, ...[...arguments].slice(2))
					}
				}
			}
			if(_vm._hasHookEvent){ _vm.$emit('hook:' + hook) }
			if(child.length){
				for(let i = 0, j = child.length; i < j; i++){
					_emit(child[i])
				}
			}
		}
		_emit(vm)
    }
    
	//重新回到页面时(前一个页面回退或者APP从后台激活)
	app.on('resume', event => {
		emitHook(vm, 'resume', event.data || {})
    })
    
	//当APP被压到后台时，或者被遮盖时触发
	app.on('pause', event => {
		emitHook(vm, 'pause')
    })
    
	//关闭webview时mpaas触发
	app.on('trackPageLintener', (event) => {
		let status = event.data.status;
		let action = event.data.action;

		if ((status == 'disappear' && action == 'client') ||
			(status == 'page.destroy' && action == 'h5')) {
			emitHook(vm, 'leave')
		}
    })
}
export function setLeftMenu(vm){

	if(vm.showLeftMenu === false){
		return app.api.showLeftMenu(false)
	}

	// AlipayJSBridge.call('setLeftMenu', {
	// 	menus: vm.leftMenu,
	// 	override: !vm.preventBack,
	// 	multiCallBack: true
	// }, res => {
	// 	vm.$emit('leftHandler', res.index)
	// })

	app.api.setLeftMenu({
		menus: vm.leftMenu,
    overrideClick: vm.preventBack,
	}, res => {
		vm.$emit('leftHandler', res.index)
	})

	if(vm.preventBack){
		app.off('back')
		app.on('back', e => {
			e.preventDefault()
			vm.$emit('leftHandler', {index: 99})
		})
	}
}

export function setRightMenu(vm){
	// AlipayJSBridge.call('setRightMenu', {
	// 	menus: vm.rightMenu,
	// 	multiCallBack: true
	// }, res => {
	// 	vm.$emit('rightHandler', res.index)
	// })

	app.api.setRightMenu({
		menus: vm.rightMenu
	}, res => {
		vm.$emit('rightHandler', res.index)
	})

}

export function setTitle(vm){
	// AlipayJSBridge.call('setMiddleTitle', vm.title, res => {
	// 	// vm.$emit('titleHandler', res.index)
	// })
	app.api.setMiddleTitle({title: vm.title}, res => {
		// vm.$emit('titleHandler', res.index)
	})
}

export function setBarBottomLineColor(vm){
	// AlipayJSBridge.call('setBarBottomLineColor', {color: vm.barBottomLineColor}, res => {
	// 	// vm.$emit('titleHandler', res.index)
	// })

	app.api.setBarBottomLineColor({color: vm.barBottomLineColor}, res => {
		// vm.$emit('titleHandler', res.index)
	})
}

export function initClientHead(vm){

	if(vm.title !== false){
		setTitle(vm)
	}

	if(vm.barBottomLineColor) {
		setBarBottomLineColor(vm)
	}

	if(vm.preventBack === true || vm.leftMenu.length > 0) {
		setLeftMenu(vm)
	}

	if(vm.rightMenu.length > 0){
		setRightMenu(vm)
	}

}


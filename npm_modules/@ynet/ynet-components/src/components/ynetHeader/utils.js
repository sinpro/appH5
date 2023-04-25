export function setPreventBack(){
	app.off('back')
	app.on('back', e => {
		e.preventDefault()
		this.$emit('leftHandler', {index: 99})
	})
}




export function initClientHead(){
	

	if(this.title !== false){
		this.setTitle(this.title)
	}

	if(this.barBottomLineColor) {
		this.setBarBottomLineColor(this.barBottomLineColor)
	}

	if(this.showLeftMenu === false){
		this.showLeftMenu(this.showLeftMenu)
	}

	if(this.preventBack === true || this.leftMenu.length > 0) {
		this.setLeftMenu(this.leftMenu)
	}

	if(this.preventBack === true){
		setPreventBack.call(this)
	}

	if(this.rightMenu.length > 0){
		this.setRightMenu(this.rightMenu)
	}

}


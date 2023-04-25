export default {
	showLeftMenu: {
		type: Boolean,
		default: true
	},
	preventBack: {
		type: Boolean,
		default: false
	},

	/*
	*	leftMenu 参数详情
	*	[
	*		{
	*			"icon": "按钮图标url、base64",   // 配合menutype使用，只有图片可以不传text字段
	*			"icontype": "scan/user/msg/back/close"  // icon、icontype二选一，客户端内置图标,优先级高于icon
	*			"text": "按钮文字"              // 按钮文字
	*			"color": "#FFFF3730"           // 按钮文字颜色，没有文字可不传
	*		}
	*	]
	*
	*/

	leftMenu: {
		type: Array,
		default(){
			return []
		}
	},


	/*
	*	rightMenu 参数详情
	*	[
	*		{
	*			"icon": "按钮图标url、base64",   // 配合menutype使用，只有图片可以不传text字段
	*			"icontype": "scan/user/msg/back/close"  // icon、icontype二选一，客户端内置图标,优先级高于icon
	*			"text": "按钮文字"              // 按钮文字
	*			"color": "#FFFF3730"           // 按钮文字颜色，没有文字可不传
	*		}
	*	]
	*
	*/
	rightMenu: {
		type: Array,
		default(){
			return []
		}
	},


	/*
	*	title 参数详情
	*		{
	*			"title": "按钮文字"              // 按钮文字
	*			"color": "#FFFF3730"           // 按钮文字颜色
	*		}
	*
	*/
	title: {
		type: null,
		default: false
	},

	/*
	 *	 设置头部底部边线颜色
	 */
	barBottomLineColor: {
		type: null,
		default: ''
	}

}
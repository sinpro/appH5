<div align="center">
	<img width="700" src="https://webpack.github.io/assets/what-is-webpack.png"><br><br>
	<img src="https://img.shields.io/badge/npm-v6.9.0-blue.svg"> <img src="https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen.svg"> <img src="https://img.shields.io/badge/webpack-v4.35.0-blue.svg"> <img src="https://img.shields.io/badge/author-Liuls-ff69b4.svg">
	<br><img src="https://img.shields.io/badge/build-passing-brightgreen.svg"> <img src="https://img.shields.io/david/webpack/webpack.svg"> <img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg"> <img src="https://img.shields.io/badge/backers%20and%20sponsors-0-brightgreen.svg"> <img src="https://img.shields.io/badge/contributors-0-brightgreen.svg"> <img src="https://img.shields.io/badge/license-MIT-blue.svg">
</div>
<br><br>
<div align="left">
	<h1 align="center">Ynet-cli</h1>
	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ynet-cli是一个模块打包工具，压缩js文件以便在浏览器中使用，同时它也可以转换、压缩、打包任何资源，基于webpack二次封装，它的主要做到开箱即用，通过一系列的配置完成项目的多页构建。
	</p>
</div>
<br>

<div><h2 align="center">Install</h2></div>

Install with npm:

```bash
	npm config set @ynet:registry =http://flameapp.cn:8081/repository/npm-private/
	npm install --save-dev @ynet/ynet-cli
```

Install with yarn:

<br><div><h2 align="center">Introduction</h2></div>

#### 可执行命令与参数

* 命令说明 `以下的命令名均为可项目中可执行命令，你需要在需要中的package.json中的script中指定`
	```
		for example: package.json
		
		{
			script: {
				"自定义命名": "ynet-dev"
			}
		}
		
		npm run 自定义命名 --args
	```

	|命令名|描述|
	|:-:|:-----:|
	|ynet-dev|构建本地开发|
	|ynet-common|构建生产环境下的全局资源包|
	|ynet-bundle|建构生产环境下的普通业务包|
	|ynet-zips|建构生产环境下zip压缩文件，可直接上传`mpaas`控制台|
	|ynet-releaseConf|建构生产环境下的bundleID映射关系，以及appList页面启动参数|
	|ynet-sourceZips|源码快速打包成压缩文件|

<br>
* 参数(仅用于业务包) `for example: npm run ynet-bundle demo happy --env=uat --platform=weixing --debug` 
* 注意 `所有非--开头的参数视为需要构建的离线包，多个bundle空隔分开，不传时视为构建全部`

	|参数名|类型|默认值|描述(缩写: --happy => --happy=true)|
	|:----:|:--:|:----:|:---------------------------------:|
	|platform|String|`liebao`|运行平台|
	|env|String|`prod`|项目运行环境，会根据此变量取出对应的环境配置文件,格式为`prod.env.js`|
	|appConf|String|`app.conf`|项目配置文件，不指定时则取项目根目录的`app.config.js`文件|
	|server|Boolean|`false`|业务包输到指定的目录之后，根据此参数起本地服务，并转换好路径,通过IP地址可访问调试|
	|debug|Boolean|`false`|业务包输到指定的目录之后，根据此参数来开启vconsole的调试功能|


<br>

#### 项目配置字段说明

* 说明： 配置中的路径均相对项目根目录

	|参数名|类型|默认值|描述|
	|:----:|:--:|:----:|:--:|
	|src|String|`src`|源码目录，指定源码目录之后取目录下的modules用作离线包目录|
	|template|String|`内置模版`|页面模版地址，不指定时则使用内置的默认模版|
	|sassResources|String|`var.scss`|scss全局变量入口文件，配置时需指定后缀名|
	|bundleInfo|String|`config/bundleInfo`|资源包配置，例如：`{ demo:{ id: 123456 } }`|
	|envConf|String|`config`|项目环境配置文件目录|
	|commonModules|String|`src/common`|全局资源包目录|
	|output|String|`dist`|构建产出物目录|
	|postcssrc|String|`内置配置`|如内置配置无法满足需求，可另外指定新的配置地址|
	|babelrc|String|`内置配置`|同上|
	|devServer|Object|[详情参考官网](https://webpack.docschina.org/configuration/dev-server/)|本地开发模式下本地服务器配置|
	:kiss:
	:smile:
	:alien:
	:scream:  devServer 常用字段有 prot, proxy, publicpath, contentbase

<br>

#### 变量说明及webpack扩展配置

* node 环境变量

	|变量名|类型|默认值|描述|
	|:----:|:--:|:----:|:--:|
	|process.env.PLATFORM|String|`liebao`|运行平台|
	|process.env.DEBUG|Boolean|`underfined`|开启调试模式|

<br>

* window 环境变量

	|变量名|类型|默认值|描述|
	|:----:|:--:|:----:|:--:|
	|precess.env.PLATFORM|String|`liebao`|运行在指定的平台|
	|precess.env.DEBUG|Boolean|`underfined`|开启调试模式|
	|bundleStat|Object|`null`|资源包的页面配置映射`仅全局包可用`|
	|bundleId|Object|`null`|资源包`ID`映射`仅全局包可用`|
	|envConfig|Object|`null`|当前环境的项目配置文件中的`envConfig`字段注入到`webpack`编译中|

<br>

* webpack 配置
	
	:unlock: 当前环境的项目配置文件中的`webpackConfig`字段以`merge`的形式合并到当前的配置中

<br>

#### 全局资源包说明

* 全局资源目录需要自己建入口文件，开发者决定需要导入及导出以及目录下新建`conf.json`进行配置

* `for example:`

```
example.js code

	import Vue from 'Vue'
	import fastclick from 'fastclick'
	import Vuex from 'Vuex'
	export default function(lib){
		const libs = {
			Vue, fastclick, Vuex
		}
		return libs[lib]
	}
	\**文件只能导出一个函数，必须 export default 导出\**
```
<br>
```
conf.json code

	{
		"fileName": {
			"exports": ["Vue", "fastclick", "Vuex"],
			"output": customDir/fileName,
			"reuqired": true
		},
		"home": {
			type: "css"
		}
	}
	\**type 作为文件类型的描述,如文件为css时必填,css无按需加载的能力所有的页面均会引入该样式文件\**
	\**fileName 作为文件导出的全局函数名，也是指定输入的文件名\**
	\**exports 作为fileName.js导出函数中的参数，非必填。 fileName('Vue') or fileName()\**
	\**output 指定代码生成的路径与文件名，非必填， 默认输出fileName\**
	\**required 表示该文件是否为页面的强依赖，是则全部页面都会引入，否则按需引入，为了提高性能应该设计文件属性\**
```

<br><div><h2 align="center">Concepts</h2></div>

* Frameworks and library

	|名称|版本|描述|
	|:----:|:--:|:--:|
	|Vue|<img src="https://img.shields.io/badge/vue-v2.6.1-success.svg">|一套用于构建用户界面的渐进式框架|
	|Vuex|<img src="https://img.shields.io/badge/vuex-v3.1.1-success.svg">|Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式|
	|fastclick|<img src="https://img.shields.io/badge/fastclick-v1.0.6-success.svg">|消除移动端浏览器上的物理点击和触发一个 click 事件之间的 300ms 的延迟|
	|lodash|<img src="https://img.shields.io/badge/lodash-v4.17.11-success.svg">|高性能的 JavaScript 实用工具库,在代码中可直接使用, `import _ from 'lodash'  _.concat()`|


<br>

* Styling

	|名称|版本|描述|
	|:----:|:--:|:--:|
	|style|<img src="https://img.shields.io/npm/v/style-loader.svg">|Add exports of a module as style to DOM|
	|css|<img src="https://img.shields.io/npm/v/css-loader.svg">|Loads CSS file with resolved imports and returns CSS code|
	|less|<img src="https://img.shields.io/npm/v/less-loader.svg">|Loads and compiles a LESS file|
	|sass|<img src="https://img.shields.io/npm/v/sass-loader.svg">|Loads and compiles a Sass/SCSS file|
	|stylus|<img src="https://img.shields.io/npm/v/stylus-loader.svg">|Loads and compiles a Stylus file|
	|PostCss|<img src="https://img.shields.io/npm/v/postcss-loader.svg">|Loads and transforms a CSS/SSS file using PostCSS|
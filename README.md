#### 1、前言
---

+ 代码规范虽不能实际提高开发人员的编码水平，但可以减少日常开发中由于不规范导致的问题、统一团队代码风格、提高项目可维护性。不按规范开发，就像非机动车也可以在机动车道上跑，甚至跑得更快，但会影响别人，而且不知道哪天会翻车。为减少维护、理解成本，希望大家在上手开发前花半天去读完规范，并遵守它。
+ 关于代码风格、代码格式化的规范可以交给编辑器以及插件去实现，请组长按要求定好统一的风格去设置。#### 1、前言
---

+ 代码规范虽不能实际提高开发人员的编码水平，但可以减少日常开发中由于不规范导致的问题、统一团队代码风格、提高项目可维护性。不按规范开发，就像非机动车也可以在机动车道上跑，甚至跑得更快，但会影响别人，而且不知道哪天会翻车。为减少维护、理解成本，希望大家在上手开发前花半天去读完规范，并遵守它。
+ 关于代码风格、代码格式化的规范可以交给编辑器以及插件去实现，请组长按要求定好统一的风格去设置。
#### 2、项目工具
---
##### 2.1 开发工具
- [vscode@1.77.2](http://code.visualstudio.com/)：所有开发人员 vscode安装统一的插件，编辑器推荐使用`VS Code`，并且安装如下插件。

<p>
      <img src="./yilai.png" width="750"  style="display:inline;">
</p>

- [nodejs@12.9.1](http://nodejs.org/) ：推荐node@12.9.1

##### 2.2 参考资料
- [sass@1.21.0](http://sass-lang.com/)
- [vue@2.6.12](http://cn.vue.org/)    2.X最新稳定版本   
- [vue-router@3.4.9](http://router.vue.js.org/zh-cn)
- [vuex@3.1.1](http://vuex.vue.js.org/zh-cn)
- [axios@0.19.2](http://www.axios-js.com/zh-cn/docs/)
- [vue-i18n@8.20.0](https://blog.csdn.net/nancypu1994/article/details/107639419)
- [mand-mobile@2.5.8](https://didi.github.io/mand-mobile/#/zh-CN/docs/introduce)
- [webpack@4.41.6](https://webpack.docschina.org/)
##### 2.3 项目结构

```
|-- config                          // 项目开发环境配置
|-- dist                            // 运行npm run build 生成的生产环境代码目录
|-- doc                             // 项目相关文档目录
|-- mock                            // 开发测试数据目录
|-- node_modules                    // node_modules依赖
|-- npm_modules                     // 私库，常用公共组件
|-- src                             // 业务代码目录
|   |-- common                      // 公共静态资源目录
|   |   |-- components              // 组件
|   |   |-- cssBundle               // 公共css文件
|   |   |   |-- assets              // 图片、svg等
|   |   |-- filters                 // 数据字典（枚举）管理、全局过滤器
|   |   |   |-- dictionary.js       // 数据字典
|   |   |   |-- index.js            // 全局过滤器
|   |   |-- initBundle              // 公共内容（包含jsapi、全局变量、服务等）
|   |   |   |-- base                //
|   |   |   |-- bridge              // rpc钩子
|   |   |   |-- init                // 全局事件、变量处理、vuex
|   |   |-- utils                   // 工具函数
|   |   |   |-- dateTools.js        // 处理日期工具函数
|   |   |   |-- judgeTools.js       // 判断工具函数
|   |   |   |-- tools.js            // 其它常用工具函数（卡号、手机号、金额）
|   |   |   |-- typeTools.js        // 类型判断工具函数
|   |-- modules                     // 功能模块目录
|   |   |-- ch_demo                 // 离线包模块一级目录（包名）
|   |   |   |-- demo                // 离线包模块二级目录（模块名）
|   |   |   |   |-- form            // 离线包模块三级目录（页面名称）
|   |   |   |-- conf.json           // 离线包模块配置文件（包含：每个页面配置。标题、是否需要登录、启动参数（导航栏背景颜色、标题颜色等））
|   |-- theme                       // mand-mobile自定义主题
|   |-- main.js                     // 全局引用文件、组件等
|-- .eslintignore                   // eslint忽略目录
|-- .eslintrc.js                    // eslint配置
|-- .gitignore                      // git忽略策略配置文件
|-- package.json                    // 项目依赖配置文件
```

##### 2.5 前端页面搭建（脚手架）
前端页面快速搭建通过脚手架的方式，使用npm run init-page package（离线包名）/module（业务模块名）/page（页面名称）快速搭建前端页面，每次生成新的页面都会自动更新离线包下的conf.json配置文件，使用方式如下：

#### 3、环境搭建
---
###### 3.1 运行环境
nodejs 官网下载并安装`node@12.9.1以上`版本和`npm@6.10.2`的版本
命令行确认 "node -v" "npm -v" 可获取版本

###### 3.2 拉取代码
本项目使用`git`版本管理工具，如对 git 不了解的，可查看[git简明指南](https://blog.csdn.net/qq_42363495/article/details/104878170)文档。运行以下代码拉取最新代码。请咨询相关人士获取 git 仓库的账号。
```
git clone xxxxxxxxx
\\ 修改本地仓库用户名和邮箱
git config user.name "中文名"
git config user.email "XXX@belink.com"
```
###### 3.3 安装本地依赖
1. 镜像配置
- [修改npm镜像地址] npm config set registry http://10.120.237.11/npm/
- [安装镜像步骤] npm config set sass_binary_site=http://10.120.237.11/media/software/node/node-sass/
2. 下载完项目后，命令行 cd 至项目目录
    <!-- 2. 运行`npm install`安装本地依赖。等待安装 -->

###### 3.4 运行调试
1. 运行`npm run dev 包名 [包名]`，在内存中生成调试包信息 调试地址：http://本机ip:8080/包名/模块名/页面名称.html 2.其它打包信息详见`打包.md`
2. 若需要依赖native的jsapi，则通过native的扫一扫，扫描**CH-生成二维码**插件生成的二维码进行调试
3. 

#### 4、打包配置
---
###### 4.1 开发运行
```
1. 运行`npm run dev 包名 [包名]`，在内存中生成调试包信息
2. 运行`npm run dev:mock 包名 [包名]`，在内存中生成模拟报文调试包信息
```
###### 4.2 打全局包
```
1. 运行`npm run common:sit`，在`/dist/`下生成对应 sit 环境的公共包信息
2. 运行`npm run build:sit`，在`/dist/`下生成对应环境的全局包资源
```

###### 4.3 全量打业务包
```
1. 运行`npm run common:sit`，在`/dist/`下生成对应环境的公共包信息
2. 运行`npm run build:sit`，在`/dist/`下生成可打包的离线资源
```

###### 4.4 单独打业务包
```
1. 运行`npm run common:sit`，在`/dist/`下生成对应环境的公共包信息
2. 运行`npm run build:sit 包名`，在`/dist/`下生成对应包名的离线资源
```
###### 4.5 手机银行打包顺序
```
1. npm run build:sit 包名 包名 包名
2. npm run common:sit
3. npm run zip
4. 内管添加新版本并发布
```

#### 5、注释规范
---
**注释的目的：**

- 提高代码的可读性，从而提高代码的可维护性

**注释的原则：**

- 如无必要，勿增注释 ( As short as possible )
- 如有必要，尽量详尽 ( As long as necessary )

##### 5.1  JavaScript 文件注释

> 单行注释：单行注释使用 //，注释应单独一行写在被注释对象的上方，不要追加在某条语句的后面。

- 推荐：

  ```javascript
  // is current tab
  const active = true;
  ```

- 不推荐：

  ```javascript
  const active = true; // is current tab
  ```

  注释行的上方需要有一个空行（**除非注释行上方是一个块的顶部**），以增加可读性。

- 推荐：

  ```javascript
  function getType() {
    console.log("fetching type...");

    // set the default type to 'no type'
    const type = this.type || "no type";
    return type;
  }
  ```

  ```javascript
  // 注释行上面是一个块的顶部时不需要空行
  function getType() {
    // set the default type to 'no type'
    const type = this.type || "no type";
    return type;
  }
  ```

- 不推荐：

  ```javascript
  function getType() {
    console.log("fetching type...");
    // set the default type to 'no type'
    const type = this.type || "no type";
    return type;
  }
  ```

> 1.2 多行注释：多行注释使用 /\*\* ... \*/，而不是多行的 //。

- 推荐：

```javascript
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {
  // ...

  return element;
}
```

- 不推荐：

```javascript
// make() returns a new element
// based on the passed in tag name
function make(tag) {
  // ...

  return element;
}
```

> 注释空格：注释内容和注释符之间需要有一个空格，以增加可读性。[eslint: spaced-comment]。

- 推荐：

```javascript
// is current tab
const active = true;

/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {
  // ...

  return element;
}
```

- 不推荐：

```javascript
//is current tab
const active = true;

/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {
  // ...

  return element;
}
```

> 特殊标记
> 有时我们发现某个可能的 bug，但因为一些原因还没法修复；或者某个地方还有一些待完成的功能，这时我们需要使用相应的特殊标记注释来告知未来的自己或合作者，以免遗漏问题。常用的特殊标记有两种：

- // FIXME : 说明问题是什么
- // TODO : 说明还要做什么或者问题的解决方案、或者硬编码（写死的代码）也应打上TODO方便检查修改

```javascript
class Calculator extends Abacus {
  constructor() {
    super();

    // FIXME: shouldn’t use a global here
    total = 0;

    // TODO: total should be configurable by an options param
    this.total = 0;
  }
}
```

> 文档类注释
> 文档类注释，如函数、类、文件、事件等；都使用 **jsdoc** 规范。

常用注释关键字：

| 注释名   | 语法                                      | 含义                 |
| :------- | :---------------------------------------- | :------------------- |
| @param   | @param 参数名 {参数类型} 描述信息         | 描述参数的信息       |
| @author  | @author 作者信息 [附属信息：如邮箱、日期] | 描述此函数作者的信息 |
| @version | @version XX.XX.XX                         | 描述此函数的版本号   |
| @example | @example 示例代码                         | 此函数的使用示范     |
| @return  | @return {返回类型} 描述信息               | 描述返回值的信息     |

```javascript
/**
 * @author xxx
 * @description Book类，代表一个书本.
 * @param {Array} data 需要转换的数据
 * @param {String} id 节点 id
 * @param {String} pid 父级节点 id
 * @param {String} child 子树为节点对象的某个属性值
 * @param {Object} labels 需要新增的字段名集合 { label: 'category_name' }
 * @return {Array}
 *
 * @example
 * new Book({data: [{id:1}, {id: 2}, {id: 3, pid: 1}]})
 * =>
 * [ { id: 1, children: [ {id: 3, pid: 1} ] }, { id: 2 } ]
 */
function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.prototype = {
  /**
   * 获取书本的标题
   * @returns {string|*}
   */
  getTitle: function () {
    return this.title;
  },
  /**
   * 设置书本的页数
   * @param pageNum {number} 页数
   */
  setPageNum: function (pageNum) {
    this.pageNum = pageNum;
  },
};
```

##### 5.2 HTML 文件注释

> 单行注释：**一般用于简单的描述，如某些状态描述、属性描述等。**注释内容前后各一个空格字符，注释位于要注释代码的上面，单独占一行。

- 推荐：

  ```html
  <!-- Comment Text -->
  <div>...</div>
  ```

- 不推荐：

```css
<div>...</div><!-- Comment Text -->

<div><!-- Comment Text -->
...
</div>
```

> 模块注释
> **一般用于描述模块的名称以及模块开始与结束的位置。**
> 注释内容前后各一个空格字符， **<!-- S Comment Text \-->**表示模块开始， **<!-- E Comment Text \-->**表示模块结束，模块与模块之间相隔一行。

- 推荐：

  ```html
  <!-- S Comment Text A -->
  <div class="mod_a">...</div>
  <!-- E Comment Text A -->

  <!-- S Comment Text B -->
  <div class="mod_b">...</div>
  <!-- E Comment Text B -->
  ```

- 不推荐：

  ```html
  <!-- S Comment Text A -->
  <div class="mod_a">...</div>
  <!-- E Comment Text A -->
  <!-- S Comment Text B -->
  <div class="mod_b">...</div>
  <!-- E Comment Text B -->
  ```

  > 嵌套模块注释
  > 当模块注释内再出现模块注释的时候，为了突出主要模块，嵌套模块不再使用。

  ```html
  <!-- S Comment Text -->
  <!-- E Comment Text -->
  ```

  而改用：

  ```html
  <!-- /Comment Text -->
  ```

  注释写在模块结尾标签底部，单独一行。

  ```html
  <!-- S Comment Text A -->
  <div class="mod__a">
    <div class="mod__b">...</div>
    <!-- /mod__b -->
  
    <div class="mod__c">...</div>
    <!-- /mod__c -->
  </div>
  <!-- E Comment Text A -->
  ```


##### 5.3 CSS 文件注释

> 单行注释
> 注释内容第一个字符和最后一个字符都是一个空格字符，单独占一行，行与行之间相隔一行。

- 推荐：

```css
/* Comment Text */
.block {
}

/* Comment Text */
.block {
}
```

- 不推荐：

```css
/*Comment Text*/
.jdc {
  display: block;
}

.jdc {
  display: block; /*Comment Text*/
}
```

> 模块注释
> 注释内容第一个字符和最后一个字符都是一个空格字符，/\* 与 模块信息描述占一行，多个横线分隔符 - 与 \*/ 占一行，行与行之间相隔两行。

- 推荐：

  ```css
  /* Module A
    ---------------------------------------------------------------- */
  .mod__a {
  }

  /* Module B
    ---------------------------------------------------------------- */
  .mod__b {
  }
  ```

- 不推荐：

  ```css
  /* Module A ---------------------------------------------------- */
  .mod__a {
  }
  /* Module B ---------------------------------------------------- */
  .mod__b {
  }
  ```

  > 文件注释
  > 在样式文件编码声明 @charset 语句下面注明页面名称、作者、创建日期等信息。


```css
@charset "UTF-8";
/**
 * @desc File Info
 * @author Author Name
 * @date 2021-01-04
 */
```

#### 6、提交规范
---
##### 6.1 新增需求：

```
需求编号：XQ20170707106302
需求名称：智能贷-网银版
测试范围：贷款 > 智能贷 > 贷款申请
```

##### 6.2 修复缺陷：

```
问题描述: bug描述
产生原因：XXXXX
测试范围：XXXX
```

案例：

```
问题描述: 前端，转账汇款 > 批量转账手工录入，行内转账，收款账户类型为企业下挂账户时，点击添加按钮，页面报错。
产生原因：添加校验
测试范围：转账汇款 > 批量转账手工录入，行内转账，收款账户类型为企业下挂账户
```

##### 6.3 拆版、代码冲突等:

> 提交代码前请检查提交内容，以免把不属于修改范围的内容提交到远程仓库。

- reqcode：需求号
- type：commit 类别，包含
  - feat: 提交新功能
  - fix: 修复了 bug
  - style: 调整了代码格式，未修改代码逻辑(例如格式化、空格、分号)
  - refactor: 代码重构，既没有修复 bug 也没有添加新功能
  - perf: 性能优化，提高性能的代码更改
  - test: 添加或修改代码测试
  - revert: 撤销上一次的 commit
  - patch: 投产当天晚上补更原因说明
  - chore: 对构建流程或辅助工具和依赖库(如文档生成等)的更改，如开源依赖包升级
- subject：commit message，简短描述不超过 100 字。推荐动词开头如：设置、修改、增加、删除、撤销等

```
拆版原因：XX需求延期
回归测试范围：影响XX交易，需要回归XX功能
```
##### 6.4 提交示例

- build：编译相关的修改，例如发布版本、对项目构建或者依赖的改动
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "build:编译某某修改"`
    ```
- chore：其他修改, 比如改变构建流程、或者增加依赖库、工具等
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "chore:其他修改"`
    ```
- ci：持续集成修改
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "ci:持续集成修改"`
    ```
- docs：文档修改
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "docs:修改某某文档"`
    ```
- feat：新特性、新功能
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "feat:增加某某功能"`
    ```
- fix：修改bug
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "fix:修改某某功能"`
    ```
- perf：优化相关，比如提升性能、体验
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "perf:优化相关配置"`
    ```
- refactor：代码重构
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "refactor:重构某某功能"`
    ```
- revert：回滚到上一个版本
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "revert:回滚上一个版本"`
    ```
- style：代码格式修改, 注意不是 css 修改
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "style:格式化某某页面"`
    ```
- test：测试用例修改
    ```
    错误示范：`git commit -m "xxx"`
    正确示范：`git commit -m "test:增加某某单元测试"`
    ```


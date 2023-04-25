import Vue from 'vue'
import Router from 'vue-router'
import Entry from '../../../Entry'

import main from './map/main'

Vue.use(Router)

//路由信息集合
const routers = [
    ...main
]

//构建路由对象
const vueRouter = new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            component: Entry,
            children: [
                ...routers,
                {
                    path: '*',
                    redirect: '/index'
                }
            ]
        }
    ]
})

//首页维护
vueRouter.afterEach(() => {
    window.scrollTo(0, 0)
})

export default vueRouter
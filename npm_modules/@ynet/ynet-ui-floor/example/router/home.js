const files = require.context('../../src/components', true, /example\/index\.vue/);

const configRouters = {};

files.keys().forEach(key => {
    configRouters[key.split('/')[1]] = files(key).default;
})

let children = []

Object.entries(configRouters).map(([key, value]) => {
    const rp = `/Home/${key}`

    //楼层路由列表
    children.push({
        path: rp,
        name: value.label || key,
        component: value
    })
})

export default [
    {
        path: "/Home",
        name: "Home",
        component: () => import('../views/Home/index.vue'),
        children: children
    }
]
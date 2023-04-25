export default [
    {
        path: 'index',
        component: () => import('../../../views/main/index')
    },
    {
        path: 'floor',
        component: () => import('../../../views/main/floor')
    },
    {
        path: 'template',
        component: () => import('../../../views/main/template')
    },
    {
        path: 'activity',
        component: () => import('../../../views/main/activity')
    }
]
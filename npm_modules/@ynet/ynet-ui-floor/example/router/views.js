export default [
    {
        path: "/Preview",
        name: "Preview",
        component: () => import('../views/Preview/index.vue')
    },
    {
        path: "/Edit",
        name: "Edit",
        component: () => import('../views/Edit/index.vue')
    },
    {
        path: "/Test",
        name: "Test",
        component: () => import('../views/Test/index.vue')
    }
]
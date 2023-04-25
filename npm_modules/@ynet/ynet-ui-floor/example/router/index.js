import Vue from "vue"
import VueRouter from "vue-router"
import home from "./home"
import views from "./views"

Vue.use(VueRouter)

let routes = [
    ...home,
    ...views,

    {
        path: "/",
        redirect: 'Home'
    }
]

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
})

export default router
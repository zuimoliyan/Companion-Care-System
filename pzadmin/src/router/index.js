import { createRouter ,createWebHashHistory } from "vue-router";

import Layout from "../views/Main.vue";
import Login from "../views/Login/index.vue";



const routes =[
    {
        path : '/',
        component : Layout
    },
    {
        path : '/login',
        component : Login
    }
]

const router = createRouter({
    //路由属性
    routes,
    //路由匹配模式
    history : createWebHashHistory()
})

export default router
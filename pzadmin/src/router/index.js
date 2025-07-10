//从vue-router中引入以下函数模块
import { createRouter ,createWebHashHistory } from "vue-router";

//引入其他界面文件，并改名
import Layout from "../views/Main.vue";
import Login from "../views/Login/index.vue";



const routes =[
    {
        //将Layout界面作为当用户访问应用的根路径
        path : '/',
        component : Layout
    },
    {
        //将Login界面作为当用户访问应用的登录路径
        path : '/login',
        component : Login
    }
]

const router = createRouter({
    //路由属性
    routes,
    // 路由匹配模式：指定路由的URL生成和解析方式
    // 这里使用 createWebHashHistory() 创建基于URL哈希(#)的浏览器历史记录模式
    // 特点：URL中会有#符号，适用于不支持HTML5 History API的环境
    history : createWebHashHistory()
})

export default router
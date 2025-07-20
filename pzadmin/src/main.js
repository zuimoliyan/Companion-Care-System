import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'
import store from "./store";

//这里实现路由守卫
router.beforeEach((to, from) => {
  //先获取浏览器存储的token信息
  const token = localStorage.getItem('pz_token')

  //判断 非登录页面且token不存在 的情况
  if (!token && to.path !== '/Login') {
    return '/Login'
  }
  //如果是已经登录，但还是要访问登录页面，我们就自动帮他跳转到根目录
  else if (token && to.path === '/Login') {
    return '/'
  }
  //其他情况不做处理
  else {
    return true
  }
})

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//路由挂载
app.use(router)
//store挂载
app.use(store)
app.mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'
import store from "./store";

router.beforeEach((to, from) => {
  const token = localStorage.getItem('pz_token')
  //判断非登录页面，token不存在
  if (!token && to.path !== '/Login') {
    return '/Login'
  }
  //如果是已经登录，但还是要访问登录页面，我们就制动帮他跳转到根目录
  else if (token && to.path === '/Login') {
    return '/'
  }
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

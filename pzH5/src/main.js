import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from "./router";
import api from "./api";
//引入消息通知库
import { Notify } from 'vant';

const app = createApp(App)

//在实例上绑定属性
app.config.globalProperties.$api = api

app.use(Notify);

//路由挂载
app.use(router)
app.mount('#app')
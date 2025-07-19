import axios from "axios";
import { ElMessage } from "element-plus";

const http = axios.create({
    baseURL: 'https://v3pz.itndedu.com/v3pz',
    timeout: 100000
})

//添加拦截器
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('pz_token')

    //设置不需要添加token的白名单
    const whiteUrl = ['/get/code', '/user/authentication', '/login']

    //if条件判断当前发送的token是否存在且不属于白名单里，都满足以后将token添加到headers里
    if (token && !whiteUrl.includes(config.url)) {
        config.headers['X-token'] = token
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对接口异常的数据需要给用户提示
    if (response.data.code === -1) {
        ElMessage.warning('接口异常：',response.data.message)
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});

export default http
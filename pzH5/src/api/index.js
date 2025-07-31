import request from "../utils/request";

//与后台管理使用不一样的方法：后台管理是暴露每一个接口

export default {
    //获取登录接口数据
    login(data) {
        return request.post('/login', data)
    },
    //获取主页banner的数据
    index() {
        return request.get('Index/index')
    }
}

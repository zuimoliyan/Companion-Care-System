import request from "../utils/request";

//与后台管理使用不一样的方法：后台管理是暴露每一个接口

export default {
    login(data) {
        return request.post('/login',data) 
    }
}

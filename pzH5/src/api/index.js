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
    },
    //订单详情信息
    h5Companion() {
        return request.get('h5/companion')
    },
    //提交订单
    createOrder(data) {
        return request.post('/createOrder', data)
    },
    //订单列表
    orderList(params) {
        return request.get('order/list', { params })
    },
    //订单详情
    orderDetail(params) {
        return request.get('order/detail', { params })
    }
}

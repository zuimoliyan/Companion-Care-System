import request from "../utils/request";

//发送验证码
export const getCode = (data) => {
    return request.post('/get/code',data)
}

//注册校验验证码
export const userAuthentication = (data)=>{
    return request.post('/user/authentication',data)
}

//登录页面
export const login = (data)=>{
    return request.post('/login',data)
}

//权限管理列表
export const authAdmin = (params)=>{
    return request.get('/menu/list',{params})
}

//菜单权限获取
export const userGetMenu = ()=>{
    return request.get('/user/getmenu')
}

<template>
    <!--登录界面-->
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card style="max-width: 480px">
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="">
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="handleChange"> {{ formType ? '返回登录' : '注册账号' }} </el-link>
            </div>
            <el-form :model="loginForm" :rules="rules" style="max-width: 600px;" class="demo-ruleForm">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="手机号" :prefix-icon="UserFilled"></el-input>
                </el-form-item>

                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" type="password" placeholder="密码"
                        :prefix-icon="Lock"></el-input>
                </el-form-item>
                <!--做判断：只有在注册界面才显示验证码-->
                <el-form-item v-if="formType" prop="validCode">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="ChatDotSquare">
                        <template #append>
                            <span @click="countdownChange">{{ countdown.validText }}</span>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <!--三目运算，formType是否为真？为真返回为'注册账号' : 为假返回为'登录'-->
                    <el-button type="primary" :style="{ width: '100%' }" @click="submitForm">
                        {{ formType ? '注册账号' : '登录' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
// 导入响应式变量
import { ref, reactive } from "vue";
//直接使用图标失败，这里是自己加上的图标
import { UserFilled, Lock, ChatDotSquare } from '@element-plus/icons-vue';

//引入各项api
import { getCode } from "../../api";

//我们设计Element-plus使用了自动按需导入,如果我们自己再导入会导致格式出错
import 'element-plus/theme-chalk/el-message.css';
import { ElMessage } from "element-plus";



const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href;

// 表单初始数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode: ''
});

//发送短信验证码
const countdown = reactive({
    validText: '获取验证码',
    time: 60
})

// 切换表单（0：登录 1：注册）
const formType = ref(0);

//账号校验规则
const validateUser = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        phoneReg.test(value) ? callback() : callback(new Error('手机号格式错误！请输入正确的手机号'))
    }
}

//密码校验规则
const validatePassWord = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        const PassWordReg = /^[a-zA-Z0-9]{4,16}$/
        PassWordReg.test(value) ? callback() : callback(new Error('密码格式错误！请输入4~16位，包含数字、字母'))
    }
}
//表单校验
const rules = reactive({
    userName: [{
        validator: validateUser, trigger: 'blur'
    }],
    passWord: [{
        validator: validatePassWord, trigger: 'blur'
    }]
})

// 点击切换登录和注册
const handleChange = () => {
    formType.value = formType.value ? 0 : 1;
};

let flag = false;
const countdownChange = () => {
    if (flag) {
        return;
    }
    // 判断手机号是否合法
    const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
        return ElMessage({
            message: '请检查手机号是否正确',
            type: 'warning',
        });
    }
    // 定时器实现倒计时
    function startCountdown() {
        let timerId; // 存储定时器的 ID
        timerId = setInterval(() => {
            if (countdown.time <= 0) {
                countdown.time = 60;
                countdown.validText = '获取验证码';
                flag = false;
                clearInterval(timerId); // 清除定时器
            } else {
                countdown.time -= 1;
                countdown.validText = `剩余${countdown.time}s`;
            }
        }, 1000);
        flag = true;
        getCode({
            tel: loginForm.userName
        }).then(({ data }) => {
            console.log(data, 'data');
            if (data.code === 10000) {
                ElMessage.success('发送成功')
            }
        })
    }
    startCountdown();
};


//实现提交表单
const submitForm = () => {

}

</script>



<style lang="less" scoped>
:deep(.el-card__header) {
    padding: 0;
}

.login-container {
    height: 100%;

    .card-header {
        background-color: #899fe1;
    }

    img {
        width: 430px;
    }
}

.jump-link {
    text-align: right;
    margin-bottom: 10px;
}
</style>

<template>
    <div class="container">
        <div class="header">
            <van-icon @click="goBack" name="arrow-left" class="header-left" size="30" />
            订单详情
        </div>
        <statusBar :item="stateMap[detailData.trade_state]" />
        <div class="tips">
            <div class="dzf" v-if="detailData.trade_state === '待支付'">
                <div class="text1">订单待支付</div>
                <div class="text2">
                    请在
                    <counter :second="second" /> 内完成支付，超时订单将自动取消
                </div>
                <div class="text3">
                    <van-button type="success" size="large" @click="showCode = true">立即支付</van-button>
                </div>
            </div>
        </div>
        <!--支付二维码弹窗-->
        <van-dialog :show-confirm-button="false" v-model:show="showCode">
            <van-icon name="cross" class="close" @click="closeCode" />
            <div>微信支付</div>
            <van-image width="150px" height="150px" :src="codeImg" />
            <div>请使用本人微信扫描二维码</div>
        </van-dialog>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import statusBar from "../../components/statusBar.vue";
import { getCurrentInstance, ref, reactive, onMounted, computed } from "vue";
import counter from "../../components/counter.vue";
import Qrcode from "qrcode";


const router = useRouter()
const route = useRoute()
const { proxy } = getCurrentInstance()

//详情页数据
const detailData = reactive({

})

//计算订单时间
const second = computed(() => {
    return detailData.order_start_time ? detailData.order_start_time + 7200000 - Date.now() : 0
})

onMounted(async () => {
    const { data } = await proxy.$api.orderDetail({ oid: route.query.oid })
    Object.assign(detailData, data.data)
    Qrcode.toDataURL(data.data.code_url).then((url) => {
        showCode.value = true
        codeImg.value = url
    })

    console.log(detailData);
})




//支付弹窗
const showCode = ref(false)
//支付二维码
const codeImg = ref('')
//关闭弹窗
const closeCode = () => {
    showCode.value = false
    showToast({
        message: '请尽快完成支付',
        position: 'bottom',
    });
}


//创建枚举
const stateMap = {
    '待支付': 10,
    '待服务': 20,
    '已完成': 30,
    '已取消': 40
}

//点击返回上级页面
const goBack = () => {
    router.go(-1)
}

</script>

<style lang="less" scoped>
.container {
    background-color: #f0f0f0;
    height: 100vh;
}

.header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;

    .header-left {
        float: left;
    }
}

.card {
    margin: 15px 0;
    padding: 10px;

    .header-text {
        padding-left: 5px;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        border-left: 4px solid red;
    }
}

.dzf {
    padding: 20px;

    .text1 {
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
        color: #666;
    }

    .text2 {
        font-size: 14px;
        color: #666;
    }

    .text3 {
        text-align: center;

        .van-button {
            margin-top: 10px;
            margin-left: 10px;
            width: 80%;
            font-weight: bold;
        }
    }
}

::v-deep(.van-dialog__content) {
    text-align: center;
    padding: 20px;

    .close {
        position: absolute;
        left: 20px;
    }
}
</style>
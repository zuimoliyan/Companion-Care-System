<template>
    <div class="btns">
        <el-button icon="Plus" type="primary" @click="open(null)">添加</el-button>
    </div>
    <el-dialog v-model="dialogFormVisable" :before-close="beforeClose" title="培护士添加" width="500">
        <el-form ref="formRef" label-width="100px" label-position="left" :model="form" :rules="rules">
            <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id" />
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name" placeholder="请填写权限名称" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-button v-if="!form.avatar" type="primary">点击上传</el-button>
                <el-image v-else :sec="form.avatar" style="width: 100px;height: 100px;" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placehilder="请选择性别">
                    <el-option label="男" vlaue="1" />
                    <el-option label="女" vlaue="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input-number v-model="num" :min="18" :max="65" @change="handleChange" value-on-clear="18" />
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="是否生效" prop="active">
                <el-radio-group v-model="form.active">
                    <el-radio-button value="0" border>失效</el-radio-button>
                    <el-radio-button value="1" border>生效</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirm(formRef)">确认</el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup>
import { reactive, ref } from "vue";

const num = ref(25)
const dialogFormVisable = ref(false)
const beforeClose = () => {

}

const formRef = ref()
const form = reactive({
    id: '',
    mobile: '',
    active: 1,
    age: 28,
    avatar: '',
    name: '',
    sex: ''
})
//表单校验
const rules = reactive({

})

//表单提交
const confirm = async (formEl) => {

    console.log(formEl.value)
    if (!formEl) return

    console.log("group/index.vue.confirm：判断formEl不为空");

    await formEl.validate((valid, fields) => {
        if (valid) {

        } else {

        }
    })
}
//点击添加按钮
const open = () => {
    dialogFormVisable.value = true
}
</script>

<style scoped>
.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
}

.image-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .img-box {
        position: relative;

        .select {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 24px;
            height: 24px;
            background-color: #67c23a;
            z-index: 999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .el-image {
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
</style>

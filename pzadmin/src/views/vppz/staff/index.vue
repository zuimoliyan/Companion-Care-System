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
                <el-button v-if="!form.avatar" type="primary" @click="dialogImgVisable = true">点击上传</el-button>
                <el-image v-else :src="form.avatar" style="width: 100px;height: 100px;" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placehilder="请选择性别">
                    <el-option label="男" value="1" />
                    <el-option label="女" value="2" />
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
                    <el-radio value="0" >失效</el-radio>
                    <el-radio value="1" >生效</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirm(formRef)">确认</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogImgVisable" :before-close="beforeImageClose" title="选择图片" width="680">
        <div class="image-list">
            <div v-for="(item, index) in fileList" :key="item.name" class="img-box" @click="selectIndex = index">
                <div v-if="selectIndex === index" class="select">
                    <el-icon color="#fff">
                        <Check />
                    </el-icon>
                </div>
                <el-image style="width: 148px;height: 148px;" :src="item.url" />
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="dialogImgVisable = false">取消</el-button>
                <el-button type="primary" @click="confirmImage">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { photoList, companion } from "../../../api";
import { ElMessage } from "element-plus";

onMounted(() => {
    photoList().then(({ data }) => {
        fileList.value = data.data
    })
})
const confirmImage = () => {
    form.avatar = fileList.value[selectIndex.value].url
    dialogImgVisable.value = false
}

const selectIndex = ref(0)
const num = ref(25)
const dialogFormVisable = ref(false)

//点击关闭表单弹窗
const beforeClose = () => {
    dialogFormVisable.value = false
    formRef.value.resetFileds()
}
//点击关闭头像选择弹窗
const beforeImageClose = () => {
    dialogImgVisable.value = false
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
    name: [{ required: true, trigger: 'blur', message: '请填写昵称' }],
    mobile: [{ required: true, trigger: 'blur', message: '请填写手机号' }],
    avatar: [{ required: true, trigger: 'blur', message: '请选择头像' }],
    sex: [{ required: true, trigger: 'blur', message: '请选择性别' }],
})

//表单提交
const confirm = async (formEl) => {
    if (!formEl) return;

    await formEl.validate((valid, fields) => {
        if (valid) {
            // 确保 active 是数字类型
            form.active = Number(form.active);
            // 确保 sex 是字符串类型
            form.sex = String(form.sex);

            companion(form).then(({ data }) => {
                if (data.code === 10000) {
                    ElMessage.success("提交成功");
                    beforeClose();
                } else {
                    ElMessage.error(data.message);
                }
            });
        } else {
            // 表单验证失败的处理逻辑
        }
    });
}
//点击添加按钮
const open = () => {
    dialogFormVisable.value = true
}
//选择头像弹窗
const dialogImgVisable = ref(false)
const fileList = ref([])
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

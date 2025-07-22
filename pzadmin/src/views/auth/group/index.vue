<template>
    <button @click="dialogFormVisable = true">添加</button>
    <el-dialog v-model="dialogFormVisable" :before-close="beforeClose" title="添加权限" width="500">
        <el-form ref="formRef" label-width="100px" label-position="left" :model="form" :rules="rules">
            <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id" />
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请填写权限名称" :autofocus="true" />
            </el-form-item>

            <el-form-item label="权限" prop="permissions">
                <el-tree ref="treeRef" :data="permissionData" style="max-width: 600px;" node-key="id" show-checkbox
                    :default-checked-keys="defaultKeys" :default-expanded-keys="[2]" />
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
import { ref, reactive, onMounted } from 'vue';
import { userGetMenu, userSetMenu, menuList } from '../../../api';


// 选中权限
const defaultKeys = ref([4, 5]);

// 树形结构菜单权限数据
const permissionData = ref([]);

// 控制弹窗的显示
const dialogFormVisable = ref(false);

const treeRef = ref()
const formRef = ref()


// 获取菜单权限数据
// 典中典一个bug改一天 => 
// 这里原本代码是
// userGetMenu().then((data) => {
//   console.log('Data.data:', data.data);
//   permissionData.value = data.data; // 将 permissionData.value 设置为 data.data
//   console.log('PermissionData.value:', permissionData.value);
// });
// 但是会出现权限弹窗里无数据，但是把data改成response就行了
onMounted(() => {
    userGetMenu().then((response) => {
        permissionData.value = response.data.data; // 将 permissionData.value 设置为 response.data.data
    })
})


// 关闭弹窗的回调
const beforeClose = () => {
    dialogFormVisable.value = false;
};

// form 数据
const form = reactive({
    id: '',
    name: '',
    permissions: ''
});

const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

//请求列表数据
const geiListData = () => {
    menuList(paginationData).then(({ data }) => {

    })
}

const rules = reactive({
    name: [
        { required: true, message: '请输入权限名称', trigger: ['blur', 'submit'] }
    ]
});


//表单提交
const confirm = async (formEl) => {

    console.log(formEl.value)
    if (!formEl) return

    console.log("group/index.vue.confirm：判断formEl不为空");

    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log("group/index.vue.confirm.formEl.validate：表单校验通过，不为空");
            //获取选择的check实例
            const permissions = JSON.stringify(treeRef.value.getCheckedKeys())
            //表单提交
            userSetMenu({ name: form.name, permissions, id: form.id }).then(({ data }) => {
                console.log(data);
            })
        } else {
            console.log("group/index.vue.confirm.formEl.validate：表单校验不通过，为空");
            console.log('error submit!', fields)
        }
    })
}

</script>

<style lang="less" scoped></style>

<template>
    <button @click="dialogFormVisable = true">添加</button>
    <el-dialog v-model="dialogFormVisable" :before-close="beforeClose" title="添加权限" width="500">
        <el-form ref="formRef" label-width="100px" label-position="left" :model="form">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请填写权限名称" />
            </el-form-item>

            <el-form-item label="权限" prop="permissions">
                <el-tree ref="treeRef" :data="permissionData" style="max-width: 600px;" node-key="id" show-checkbox
                    :default-checked-keys="defaultKeys" />
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { userGetMenu } from '../../../api';

// 关闭弹窗的回调
const beforeClose = () => {
    dialogFormVisable.value = false;
};

// 选中权限
const defaultKeys = ref([4, 5]);

// 树形结构菜单权限数据
const permissionData = ref([]);

// 获取菜单权限数据
// 典中典一个bug改一天 => 
// 这里原本代码是
// userGetMenu().then((data) => {
//   console.log('Data.data:', data.data);
//   permissionData.value = data.data; // 将 permissionData.value 设置为 data.data
//   console.log('PermissionData.value:', permissionData.value);
// });
// 但是会出现权限弹窗里无数据，但是把data改成response就行了

userGetMenu().then((response) => {
    permissionData.value = response.data.data; // 将 permissionData.value 设置为 response.data.data
});


// form 数据
const form = reactive({
    name: '',
    permissions: ''
});

// 控制弹窗的显示
const dialogFormVisable = ref(false);

const treeRef = ref()
</script>

<style lang="less" scoped></style>

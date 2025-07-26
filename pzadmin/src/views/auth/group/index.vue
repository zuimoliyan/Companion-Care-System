<template>
    <panel-head />
    <div class="btns">
        <el-button icon="Plus" type="primary" @click="open(null)">添加</el-button>
    </div>

    <el-table :data="tableData.list" style="width: 100% ; height: 520px;">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="permissionName" label="菜单权限" width="500" />
        <el-table-column label="操作">
            <template #default="scoped">
                <div>
                    <el-button type="primary" @click="open(scoped.row)">编辑</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>

    <div class="pagination-info">
        <el-pagination v-model:current-page="paginationData.pageNum" v-model:page-size="paginationData.pageSize"
            :page-sizes="[5, 10, 15, 20]" :background="false" layout="sizes, prev, pager, next" :total="tableData.total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

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
import { ref, reactive, onMounted, nextTick } from 'vue';
import { userGetMenu, userSetMenu, menuList } from '../../../api';
import { ElMessage } from 'element-plus';


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
    getListData()
})

//列表数据
const tableData = reactive({
    list: [],
    total: 0
})

//打开弹窗
const open = (rowData) => {
    dialogFormVisable.value = true

    //弹窗打开form生成是异步操作
    nextTick(() => {
        if (rowData) {
            Object.assign(form, { id: rowData.id, name: rowData.name })
            treeRef.value.setCheckedKeys(rowData.permission)
        }
    })
}

// 关闭弹窗的回调
const beforeClose = () => {
    dialogFormVisable.value = false
    //重置表单
    formRef.value.resetFields()
    //treeRef的选择重置
    //defaultKeys 是一个 ref，而 setCheckedKeys 方法可能期望的是一个普通的数组而不是一个 ref 对象
    //将 defaultKeys 转换为普通的数组形式，然后再传递给 setCheckedKeys 方法
    treeRef.value.setCheckedKeys(defaultKeys.value)
};

// form 数据
const form = reactive({
    id: '',
    name: '',
    permissions: ''
});

const paginationData = reactive({
    pageNum: 1, // 列表页的个数
    pageSize: 10 // 每页的数据个数
})
//定义分页的回调函数
//1.修改分页
const handleSizeChange = (val) => {
    paginationData.pageSize = val
    getListData()
}
//2.点击页码
const handleCurrentChange = (val) => {
    paginationData.pageNum = val
    getListData()
}

//请求列表数据
const getListData = () => {
    menuList(paginationData).then(({ data }) => {
        const { list, total } = data.data
        tableData.list = list
        tableData.total = total
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
                beforeClose()
                getListData()
            })
        } else {
            console.log("group/index.vue.confirm.formEl.validate：表单校验不通过，为空");
            console.log('error submit!', fields)
        }
    })
}

</script>

<style lang="less" scoped>
.btns {
    padding: 10px 0 10px 10px;
    background-color: wh;
}
</style>

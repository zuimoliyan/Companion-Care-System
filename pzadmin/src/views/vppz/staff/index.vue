<template>
    <panel-head :router="route" />
    <div class="btns">
        <el-button icon="Plus" type="primary" @click="open(null)">添加</el-button>

        <el-popconfirm width="220" :icon="InfoFilled" icon-color="#626AEF" title="是否确定要删除?" @cancel="onCancel">
            <template #reference>
                <el-button type="danger" icon="Delete">删除</el-button>
            </template>
            <template #actions="{ confirmDelete, cancel }">
                <el-button size="small" @click="cancel">取消</el-button>
                <el-button type="danger" size="small" :disabled="clicked" @click="confirmDelete">确认</el-button>
            </template>
        </el-popconfirm>
    </div>


    <el-table :data="tableData.list" style="width: 100% ; height: 520px;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column label="菜单权限">
            <template #default="scope">
                <el-image style="width:50px;height:50px" :src="scope.row.avatar" />
            </template>
        </el-table-column>

        <el-table-column prop="sex" label="性别">
            <template #default="scope">
                {{ scope.row.sex === '1' ? '男' : '女' }}
            </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" />

        <el-table-column prop="active" label="状态">
            <template #default="scope">
                <el-tag :type="scope.row.active ? 'success' : 'danger'">
                    {{ scope.row.active ? "生效" : "失效" }}
                </el-tag>
            </template>
        </el-table-column>

        <el-table-column label="创建时间">
            <template #default="scope">
                <div class="flex-box">
                    <el-icon>
                        <Clock />
                    </el-icon>
                    <span style="margin-left: 10px;">{{ scope.row.create_time }}</span>
                </div>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template #default="scope">
                <div>
                    <el-button type="primary" @click="open(scope.row)">编辑</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-info">
        <el-pagination v-model:current-page="paginationData.pageNum" v-model:page-size="paginationData.pageSize"
            :page-sizes="[5, 10, 15, 20]" :background="false" layout="sizes, prev, pager, next" :total="tableData.total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
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
                    <el-radio value="0">失效</el-radio>
                    <el-radio value="1">生效</el-radio>
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
import { reactive, ref, onMounted, nextTick } from "vue";
import { photoList, companion, companionList, deleteCompanion } from "../../../api";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import { useRoute } from "vue-router";

const route = useRoute()

onMounted(() => {
    photoList().then(({ data }) => {
        fileList.value = data.data
    })
    getListData()
})

//分页数据
const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

const tableData = reactive({
    list: [],
    total: 0
})

//存储勾选列表的数据
const selectTableData = ref([])
const handleSelectionChange = (val) => {
    selectTableData.value = val.map(item => ({ id: item.id }))
}

//删除表单数据
const confirmDelete = () => {
    //没有选择
    if (!selectTableData.value.length) {
        return ElMessage.warning("请至少选择一项！")
    }
    deleteCompanion({ id: selectTableData.value }).then(({ data }) => {
        //如果请求成功
        if (data.code === 10000) {
            ElMessage.success("删除成功！")
            getListData()
        }
    })
}

const getListData = () => {
    console.log("执行getListData");

    companionList(paginationData).then(({ data }) => {
        const { list, total } = data.data
        list.forEach(item => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
        })
        tableData.list = list
        tableData.total = total
    })
}

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
    formRef.value.resetFields()
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
                    getListData()
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
const open = (rowData = {}) => {
    dialogFormVisable.value = true
    nextTick(() => {
        //如果是编辑
        if (rowData) {
            Object.assign(form, rowData)
        }
    })
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

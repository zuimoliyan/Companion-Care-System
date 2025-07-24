<template>
    <el-table :data="tableData.list" style="width: 100% ; height: 520px;">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="permissions_id" label="所属组别">
            <template #default="scoped">
                <div>
                    {{ permissionName(scoped.row.permissions_id) }}
                </div>
            </template>
        </el-table-column>

        <el-table-column prop="mobile" label="手机号" />

        <el-table-column prop="active" label="状态">
            <template #default="scoped">
                <el-tag :type="scoped.row.active ? 'success' : 'danger'">
                    {{ scoped.row.active ? "正常" : "失效" }}
                </el-tag>
            </template>
        </el-table-column>

        <el-table-column label="创建时间">
            <template #default="scoped">
                <div class="flex-box">
                    <el-icon>
                        <Clock />
                    </el-icon>
                    <span style="margin-left: 10px;">{{ scoped.row.create_tiem }}</span>
                </div>

            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template #default="scoped">
                <div>
                    <el-button type="primary" @click="open(scoped.row)">编辑</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { authAdmin, menuSelectList } from "../../../api";
import { ref, reactive, onMounted } from "vue";
import dayjs from "dayjs";

//列表数据
const tableData = reactive({
    list: [],
    total: 0
})

const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

onMounted(() => {
    authAdmin(paginationData).then(({ data }) => {
        const { list, total } = data.data
        list.forEach(item => {
            item.create_tiem = dayjs(item.create_tiem).format('YYYY-MM-DD')
        })
        tableData.list = list
        tableData.total = total
    })
    menuSelectList().then(({ data }) => {
        options.value = data.data
    })
})

const options = ref([])

//根据权限id匹配权限名称
const permissionName = (id) => {
    const data = options.value.find(el => el.id === id)
    return data ? data.name : '超级管理员'
}


const open = () => {

}
</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    align-items: center;
}
</style>

<template>
    <div>
        admin：测试
    </div>
</template>

<script setup>
import { authAdmin } from "../../../api";
import { reactive, onMounted } from "vue";

const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

onMounted(() => {
    authAdmin(paginationData).then(({ data }) => {
        //测试用
        console.log(data,'authAdmin');
    })
})
</script>

<style scoped></style>

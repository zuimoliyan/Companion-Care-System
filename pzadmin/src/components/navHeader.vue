<template>
    <div class="header-container">
        <div class="header-left">
            <el-icon class="icon" size="20px" @click="store.commit('collapseMenu'), console.log('点击事件')">
        <Fold />
      </el-icon>
        </div>

        <div class="header-right">

            <el-dropdown>
                <div class="el-dropdown-link flex-box">
                    <el-avatar> 登录 </el-avatar>
                    <p class="user-name">admin</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";

//拿到store实例
const store = useStore()
</script>

<style lang="less" scoped>
.flex-box{
    display: flex;
    align-items: center;
}
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;

    .header-left {
        height: 100%;

        .icon {
            width: 45px;
            height: 100%;
        }

        .icon:hover {
            background-color: #fff;
            cursor: pointer;
        }
    }
    .header-right{
.user-name{
     margin-left: 10px;
}
    }
}
</style>

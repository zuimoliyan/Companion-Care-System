<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon class="icon" size="20px" @click="store.commit('collapseMenu'), console.log('点击事件')">
                <Fold />
            </el-icon>

            <ul class="flex-box">
                <li v-for="(item, index) in selectMenu" :key="item.path" :class="{ selected: route.path === item.path }" class="tab flex-box">
                    <el-icon size="12px">
                        <component :is="item.icon" />
                    </el-icon>
                    <router-link class="text flex-box" :to="{ path: item.path }">
                        {{ item.name }}
                    </router-link>

                    <el-icon size="12px" class="close">
                        <Close />
                    </el-icon>

                </li>
            </ul>

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

import { computed } from "vue";

import { useStore } from "vuex";

import { useRoute } from "vue-router";
//当前路由对象
const route = useRoute()

//拿到store实例
const store = useStore()

const selectMenu = computed(() => store.state.menu.selectMenu)
</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    align-items: center;
    height: 100%;
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
            background-color: #f5f5f5;
            cursor: pointer;
        }

        .tab {
            padding: 0 10px;
            height: 100%;

            .text {
                margin: 0 5px;
            }

            .close {
                visibility: hidden;
            }

            &.selected {
            a {
                color:#409eff;
            }

            i {
                color:#409eff;
            }
            background-color: #f5f5f5; 
        }
        }
        

        .tab:hover {
            background-color: #f5f5f5;
            cursor: pointer;

            .close {
                visibility: inherit;
                cursor: pointer;
                color: black;
            }
        }

    }

    a {
        height: 100%;
        color: black;
        font-size: 15px;
    }

    .header-right {
        .user-name {
            margin-left: 10px;
        }
    }
}
</style>

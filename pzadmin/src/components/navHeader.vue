<!-- 这里用于实现顶部：1.左侧标签 2.右侧登录信息 -->
<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <!-- 点击折叠按钮的图标，实现发送点击信号，实现折叠功能 -->
            <el-icon class="icon" size="20px" @click="store.commit('collapseMenu'), console.log('点击事件')">
                <Fold />
            </el-icon>

            <!-- 这里的意思是：一个无序列表的单个标签由 1.标签图标 2.标签文字 3.关闭图标 三部分组成-->
            <ul class="flex-box">
                <!-- 遍历 selectMenu 数组，为每个元素创建一个 <li> 元素 （selectMenu中的元素在menu.js中由addMenu和closeMenu实现）
                    并根据当前路由路径动态添加 selected 类
                    这样可以实现根据当前路由高亮显示对应的菜单项 
                -->
                <li v-for="(item, index) in selectMenu" :key="item.path" :class="{ selected: route.path === item.path }"
                    class="tab flex-box">
                    <el-icon size="12px">
                        <component :is="item.icon" />
                    </el-icon>
                    <router-link class="text flex-box" :to="{ path: item.path }">
                        {{ item.name }}
                    </router-link>

                    <el-icon size="12px" class="close" @click="closeTab(item, index)">
                        <Close />
                    </el-icon>

                </li>
            </ul>

        </div>

        <div class="header-right">
            <!-- 这里套用element-plus的模版 -->
            <el-dropdown @command="handleClick">
                <div class="el-dropdown-link flex-box">
                    <el-avatar src="../../public/代替头像.jpg" />
                    <p class="user-name">{{ userInfo.name }}</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="cancel">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>

<script setup>

import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";


const userInfo = JSON.parse(localStorage.getItem('pz_userInfo'))
//当前路由对象
const route = useRoute()
//用于实现点击关闭tag功能
const router = useRouter()
//拿到store实例
const store = useStore()

const selectMenu = computed(() => store.state.menu.selectMenu)

// 点击关闭tag
// 这里的思路：
// 1.tag只有一个的情况：直接跳转到根目录
// 2.页面不止一个且删除 非 焦点页
//    直接调用 state.selectMenu.splice(index,1)
// 3.页面不止一个且删除 焦点页
//   3.1如果是最后一位为焦点：
//    调用 state.selectMenu.splice(index,1)后
//    跳转到selectMenuData-1项
//   3.2如果是不是最后一位为焦点：
//   直接调用 state.selectMenu.splice(index,1)
const closeTab = (item, index) => {
    store.commit('closeMenu', item)
    // 删除的是非当前页tag
    if (route.path !== item.path) {
        return
    }

    const selectMenuData = selectMenu.value
    //如果删除的是最后一项
    if (index === selectMenuData.length) {
        // 如果tag只有一位
        if (!selectMenuData.length) {
            router.push('/')
        } else {
            router.push({
                path: selectMenuData[index - 1].path
            })
        }
    } else {
        //如果删除的是中间位tag
        router.push({
            path: selectMenuData[index].path
        })
    }
}

const handleClick = (command) => {
    if (command === "cancel") {
        // 临时添加路由守卫绕过重定向检查
        const removeGuard = router.beforeEach((to, from, next) => {
            if (to.path === '/') {
                next('/Login'); // 直接重定向到登录页
            } else {
                next();
            }
            removeGuard(); // 立即移除守卫
        });

        ElNotification({
            title: 'Success',
            message: '退出登录成功',
            type: 'success',
        })

        setTimeout(() => {
            localStorage.removeItem('pz_token');
            localStorage.removeItem('pz_userInfo');
            localStorage.removeItem('pz_v3pz');
            router.push('/'); // 触发守卫重定向
        }, 300);
    }
}
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
                    color: #409eff;
                }

                i {
                    color: #409eff;
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

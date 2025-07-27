<!--这里是左侧菜单树部分的代码主框架文件，我们会把每个菜单树（各个一级、二级菜单）封装成一个独立的文件-->
<template>
  <!-- 对于el-menu标签要注意的就是 ：
      1. 通过三目运算符 设置展开/折叠的 背景宽度
      2. @open 和 @close 目前不知道它的作用，删除照样可以实现展开和折叠
      3. :collapse="isCollapse" 用于检测当前isCollapse的值
         控制页面的展开和折叠，接收的是 navHeader.vue 中对于logo的 点击：@click="store.commit('collapseMenu')
  -->
  <el-menu :style="{ width: !isCollapse ? '230px' : '64px' }" active-text-color="#ffd04b" background-color="#545c64"
    class="aside-container" text-color="#fff" @open="handleOpen" @close="handleClose"
    :default-active="active" :collapse="isCollapse">
    <p class="logo" @click="goToRoot">{{ isCollapse ? 'DIDI' : 'DIDI陪诊' }}</p>

    <!-- 将具体的一级二级菜单挂载到主框架 -->
    <treeMenu :index="1" :menuData="menuData" />


  </el-menu>
</template>

<script setup>
// 引入封装的菜单
import treeMenu from "./treeMenu.vue";
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import { useStore } from "vuex";


const router = useRouter()

const active = computed(() => store.state.menu.menuActive)

//创建响应式的数据
// const menuData = reactive(router.options.routes[0].children)
const menuData = computed(() => store.state.menu.routerList)
const store = useStore()
//控制左侧菜单树面板展开与否
// 调用menu.js中的代码，当调用这个 mutation 时，它会将 isCollapse 的值取反。
const isCollapse = computed(() => store.state.menu.isCollapse)

const handleOpen = () => { }
const handleClose = () => { }

// 这里用于实现点击logo跳转到根目录
const goToRoot = () => {
  window.location.href = '/'; // 跳转到根目录
};
</script>

<style lang="less" scoped>
.aside-container {
  //设置左侧的菜单铺满整个容器，但是这里要注意：
  // aside-container上面有其他父容器，所以这里只是让它铺满了父容器，
  // 我们还需要去找到它的父容器（Main.vue）并设置相同样式
  height: 100%;

  .logo {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>

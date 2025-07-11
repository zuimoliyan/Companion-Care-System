<template>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
      <p class="logo">DIDI陪诊</p>

    <treeMenu/>

        
      </el-menu>
</template>

<script setup>
import treeMenu from "./treeMenu.vue";

const handleOpen = ()=>{}
const handleClose = ()=>{}
</script>

<style lang ="less" scoped>
.aside-container{ //设置左侧的菜单铺满整个容器，但是这里要注意：
                  // aside-container上面有其他父容器，所以这里只是让它铺满了父容器，
                  // 我们还需要去找到它的父容器（Main.vue）并设置相同样式
  height: 100%;
  .logo{
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>

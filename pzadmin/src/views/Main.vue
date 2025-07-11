<template>
  <div class="common-layout">
    
      <el-container>
        <Aside />
        <!-- <el-aside width="200px">Aside</el-aside> -->
    <el-container>

      <el-header>Header</el-header>
      <el-main>Main</el-main>
      
    </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../components/aside.vue";
</script>

<style lang="less" scoped>
.common-layout{ //这里就是aside.vue中aside-container的父容器
                //但是这里的嵌套规则是common-layout->el-container
                //所以我们两个都要设置占满屏幕
  height: 100%;
    .el-container { 
    height: 100%;
  }
}

</style>
<template>
    <!--先遍历判断是否有子菜单-->
    <template v-for="(item, index) in props.menuData">

        <!--这里是没有子菜单的情况-->
        <!--当点击菜单树中的按钮时，传递当前数据、索引-->
        <el-menu-item
        @click="handleClick(item,`${props.index}-${item.meta.id}`)"
        v-if="!item.children || item.children.length == 0"
        :index="`${props.index}-${item.meta.id}`"
        :key="`${props.index}-${item.meta.id}`">
            <el-icon size="20">
                <component :is="item.meta.icon"></component>  
             </el-icon>                    
            <span>{{ item.meta.name }}</span>
        </el-menu-item>

        <!--
        备注：
        恶心死了

         <el-icon size="20">
                <component :is="item.meta.icon"></component>  
             </el-icon>                    
            <span>{{ item.meta.name }}</span>
        </el-menu-item>

        第一次写成了

         <el-icon size="20">
                <component :is="item.meta.icon">
                    <span>{{ item.meta.name }}</span>
                </component>  
             </el-icon>                    
        </el-menu-item>

        导致样式不对！！！！！！！！！
        -->

        <!--这里是有子菜单的情况-->
        <el-sub-menu 
        v-else
        :index="`${props.index}-${item.meta.id}`">
        <template #title>
            <el-icon size="20">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.name }}</span>
        </template>
        <tree-menu 
        :index="`${props.index}-${item.meta.id}`" :menuData ="item.children" />
        </el-sub-menu>

    </template>
</template>

<script setup>

import { useRouter } from "vue-router";

//defineProps 是一个编译时特性,语法糖
//如果不在 <script setup> 中使用，Vue 无法在编译时正确解析它

//创建路由实例
const router = useRouter()

//点击菜单跳转
const props = defineProps(['menuData', 'index'])

//这里有一个问题：
// 为什么这里明明没有在二级菜单上定义点击事件，却还是能跳转？
//答：即使二级菜单没有直接绑定点击事件，点击事件也会冒泡到一级菜单 （事件冒泡机制（Event Bubbling））
const handleClick = (item,active) =>{
    //根据 item.meta.path 的值，导航到指定的路由路径
    //如果 item.meta.path 是 /home，那么这段代码就会将页面导航到 /home 路由对应的组件
    router.push(item.meta.path)
}


</script>
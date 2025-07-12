<template>
    <!--先遍历判断是否有子菜单-->
    <template v-for="(item, index) in props.menuData">

        <!--这里是没有子菜单的情况-->
        <el-menu-item
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
//defineProps 是一个编译时特性,语法糖
//如果不在 <script setup> 中使用，Vue 无法在编译时正确解析它
const props = defineProps(['menuData', 'index'])
console.log(props);

</script>
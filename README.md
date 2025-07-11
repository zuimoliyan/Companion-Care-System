#

## 环境配置

node.js版本 v-20.16.0
<https://mirrors.aliyun.com/nodejs-release/v20.16.0/>

编译器 vsCode
<https://code.visualstudio.com/>

vite
<https://cn.vitejs.dev/>

vue-router
<https://router.vuejs.org/zh/>

## 路由创建

创建路由和对应界面
引入 vue-router 创建路由实例
挂载 router 到 vue 实例上
对应页面使用 `<RouterView/>` 配置路由显示
<<<<<<< HEAD

## UI框架

Element Plus
<https://element-plus.org/zh-CN/>

UI框架的优点：

- 开箱即用
- 很多js的交互界面内置在组件中
- 组件多

Element Plus的引入方式

- 完整引入
- 按需导入
本项目使用的是按需引入
首先先安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```shell
cnpm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 Vite

```vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```
=======
>>>>>>> 922adabfafdb30239bfa304fe6d05b3067b849a5

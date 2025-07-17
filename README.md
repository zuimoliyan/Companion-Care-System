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

vuex
<https://vuex.vuejs.org/zh/>

接口文档：用于项目的验证码等数据的校验
<https://apifox.com/apidoc/shared/205c93aa-6b50-4a1a-85be-b93dc5304443>

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

## 页面的Layout布局

- 找到Element plus中的 Container布局容器，找到我们需要的布局样式，复制代码粘贴到Main.vue中
<https://element-plus.org/zh-CN/component/container.html>
- 封装的思想，我们把每个布局分别用一个独立的文件存储，存放在`src/components`下
  - aside布局：
使用对应的 Menu 菜单做导航栏
<https://element-plus.org/zh-CN/component/menu.html>

## aside组件内容

使用 `cnpm i less@2.4.0`安装less组件

- Less是一种动态样式语言，它扩展了CSS的功能，使得CSS更加强大和易于维护

设置aside组件中左侧菜单树铺满整个屏幕，并将菜单树的内容设置单独的文件`treeMenu.vue`存放（封装）

## 完善treeMenu的菜单书元素

### 为什么没有在二级菜单上定义点击事件，却还是能跳转？

**第一点：递归继承事件实现子菜单点击**
在无子菜单的父级 `<el-menu-item>` 上设置 `@click` 事件后，即使没有显式为包含子菜单的组件（如 `<el-sub-menu>`）设置点击事件，其递归调用的子组件在重新渲染自身的 `<el-menu-item>` 时，会自动继承并绑定父组件传递下来的 `@click` 事件。这就解释了为什么二级菜单项（或其他层级的子菜单项）在被点击时，能够触发最初在父级组件上定义的点击处理逻辑，实现了点击跳转或执行特定功能。

**第二点：事件继承的传递性理解**
当有子菜单的组件（如 `<el-sub-menu>`）内部调用 `<el-menu-item>` 时，它会使用带有从父组件继承的 `@click` 事件。这并不是因为“保存”了某个设置，而是 Vue 组件通信和递归渲染的机制所致：父组件传递给子组件的事件或属性，会在子组件渲染时被接收并应用。因此，即使子组件自身的模板代码看起来和最初无事件的版本一样，但由于接收到了父级传递的事件，渲染出的 `<el-menu-item>` 就会带有这个点击事件，确保了点击行为的传递性。

**第三点：`<el-sub-menu>` 本身的点击行为限制**
直接点击 `<el-sub-menu>` 组件本身时，它并不会触发继承自父级的事件（比如跳转），而是会执行 Element UI 内置的默认行为，即展开或收起其包含的子菜单。这是因为 `<el-sub-menu>` 的设计初衷就是作为子菜单的容器，其点击交互优先处理菜单的展开/收起逻辑。即使该 `<el-sub-menu>` 在渲染过程中可能接收到父级传递的事件，Element UI 的内部实现会优先处理自身的展开/收起逻辑，并通常会阻止事件继续冒泡，从而使得继承的点击事件无法被触发。

## 为项目导入element-plus的图标

1.下载

`cnpm install @element-plus/icons-vue`

2.注册所有图标

```js
//main.js
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

## Header组件完善

## 登录页面编写


const localData = localStorage.getItem('pz_v3pz')

// state 存储应用的全局状态;包含两个属性
const state = localData ? localData.menu : {
    isCollapse: false, //是否折叠
    selectMenu: [], //存储选中的菜单项
    routerList: [],
    menuActive: '1-1'
}

const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    // 在 addMenu 方法中，selectMenu 会被用来检查是否已经存在相同的菜单项
    addMenu(state, payload) {
        // 对数据进行去重
        // 对数据进行去重：检查 payload.path 是否已存在于 selectMenu 中
        if (state.selectMenu.findIndex(item => item.path === payload.path) == -1) {
            state.selectMenu.push(payload)
        }
    },

    closeMenu(state, payload) {
        // 找到数据的索引
        const index = state.selectMenu.findIndex(val => val.name === payload.name)
        //通过索引删除数组指定元素
        state.selectMenu.splice(index, 1)
    },
    dynamicMenu(state, payload) {
        // 通过 glob 导入文件
        const modules = import.meta.glob('../views/**/**/*.vue')
        console.log(modules);

        function routerSet(routes) {
            routes.forEach(route => {
                // 判断没有子菜单，拼接路由数据
                if (!route.children) {
                    const url = `../views${route.meta.path}/index.vue`
                    // 拿到获取的vue组件
                    route.component = modules[url]
                } else {
                    console.log('处理子路由:', route.meta.path, '子路由配置:', route.children);
                    routerSet(route.children)
                }
            })
        }
        console.log('最终路由列表:', state.routerList);
        routerSet(payload)
        // 拿到完整的路由数据
        state.routerList = payload
    },
    updateMenuActive(state, payload) {
        console.log("执行updateMenuActive修改");
        
        state.menuActive = payload
    }

}

export default {
    state,
    mutations
}
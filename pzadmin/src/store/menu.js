// state 存储应用的全局状态;包含两个属性
const state = {
    isCollapse:false, //是否折叠
    selectMenu:[] //存储选中的菜单项
}

const mutations = {
    collapseMenu(state){
        state.isCollapse = !state.isCollapse
    },
    // 在 addMenu 方法中，selectMenu 会被用来检查是否已经存在相同的菜单项
    addMenu(state,payload){
        // 对数据进行去重
        // 对数据进行去重：检查 payload.path 是否已存在于 selectMenu 中
        if( state.selectMenu.findIndex(item=>item.path===payload.path) == -1 ){
            state.selectMenu.push(payload)
        }
    },

    closeMenu(state,payload){
        // 找到数据的索引
        const index = state.selectMenu.findIndex(val => val.name  ===payload.name)
        //通过索引删除数组指定元素
        state.selectMenu.splice(index,1)
    }
}

export default{
    state,
    mutations
}
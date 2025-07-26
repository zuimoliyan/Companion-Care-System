import { createStore } from "vuex";
import menu from "./menu";
import createPersistedstate from "vuex-persistedstate";

export default createStore({
    plugins: [
        createPersistedstate({
            key: 'pz_v3pz',
            paths: ['menu'], // 指定需要持久化的 state 路径
            debug: true // 调试模式
        })
    ],
    modules: {
        menu
    }
})
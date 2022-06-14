import {defineStore} from 'pinia'

interface storeTypes {
    collapse: boolean
}

export const useLayoutStore = defineStore('layout', {
    // 存储全局状态
    state: (): storeTypes => {
        return {
            collapse: false
        }
    },

    // 封装计算属性 具有缓存功能
    getters: {
        getCollapse(state) {
            return state.collapse
        },
    },

    // 封装业务逻辑 修改state
    actions: {
        setCollapse(status: boolean) {
            this.collapse = status
        },
    }
})
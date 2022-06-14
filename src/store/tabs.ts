import {defineStore} from 'pinia'
import {tabsTypes} from '../components/tabs/types'

interface ITabStore {
    tabs: tabsTypes[],
    activeName: string
    currentTabName: string
    isContextMenu?: boolean
}

export const useTabsStore = defineStore('tabs', {

    state: (): ITabStore => {
        return {
            tabs: [],
            activeName: '',
            currentTabName: '',
            isContextMenu: false
        }
    },

    getters: {
        getTabs(state) {
            return state.tabs
        },
        getActiveName(state) {
            return state.activeName
        },
        getCurrentTabName(state) {
            return state.currentTabName
        },
        getIsContextMenu(state) {
            return state.isContextMenu
        }
    },

    actions: {
        // 设置选中tab
        setActiveTab(name: string) {
            this.activeName = name
        },
        // 设置右键菜单path
        setCurrentTabName(name: string) {
            this.currentTabName = name
        },
        // 设置右键菜单
        setIsContextMenu(val: boolean) {
            this.isContextMenu = val
        },
        // 新增tab
        insertTab(tab: tabsTypes) {
            if (this.tabs.some(item => item.path === tab.path)) return
            this.tabs.push({name: tab.name, title: tab.title, path: tab.path})
        },
        // 删除tab
        tabRemove(name: string) {
            let index = this.tabs.findIndex(item => item.name === name)
            let nextTab: tabsTypes = this.tabs[index + 1] || this.tabs[index - 1]
            this.activeName = nextTab.name // 设置新的被选中选项卡
            this.tabs.splice(index, 1)// 删除tabs中的数据
        },
        // 删除所有tab
        tabRemoveAll() {
            this.tabs.splice(1, this.tabs.length)
            this.activeName = this.tabs[0].name
        },
        // 删除其他tab
        tabRemoveOthers(name: string) {
            let index = this.tabs.findIndex(item => item.name === name)
            if (index === 0) {
                this.tabRemoveAll()
            } else {
                this.tabs.splice(1, index - 1)
                this.tabs.splice(2, this.tabs.length)
                this.activeName = name
            }
        }
    }
})
<template>
  <div class="tab-parent">
    <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="tabClick"
        @tab-remove="tabRemove"
        @contextmenu.prevent.active="contextMenu($event)"
        v-show="tabs.length>0"
        @mousedown="mouseDown($event)">
      <template v-for="(item,index) in tabs" :key="index">
        <el-tab-pane
            :label="item.title"
            :name="item.name"
            :closable="index!==0"/>
      </template>
    </el-tabs>
  </div>

  <!--右键菜单项-->
  <ul v-show="isContextMenu"
      :style="{left:left+'px',top:top+'px'}"
      class="contextMenu">
    <li @click="refreshTab(store.getCurrentTabName)">刷新</li>
    <li v-show="store.getCurrentTabName!=='dashboard'" @click="closeTab(store.getCurrentTabName)">关闭</li>
    <li @click="closeOtherTab(store.getCurrentTabName)">关闭其他</li>
    <li @click="closeAllTab">关闭所有</li>
  </ul>

</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useTabsStore} from '../../store/tabs'
import {tabsTypes} from './types'

const route = useRoute()
const router = useRouter()
const store = useTabsStore()
const activeName = computed({
  set: (val) => {
    store.setActiveTab(val)
  },
  get: () => {
    return store.getActiveName
  }
})
const tabs = computed(() => store.getTabs)

// 监听路由变化设置选项卡的值
watch(() => route.path, () => {
  store.setActiveTab(route.name as string)
  store.insertTab({name: route.name as string, title: route.meta.title as string, path: route.path})
})

// 监听选项卡值变化设置对应得路由
watch(() => activeName.value, () => router.push(store.getTabs[store.getTabs.findIndex(item => item.name === activeName.value)].path))

// 点击实现路由跳转
const tabClick = (event: any) => router.push(store.getTabs[store.getTabs.findIndex(item => item.name === event.props.name)].path)

// 点击删除tab选项卡
const tabRemove = (name: string) => store.tabRemove(name)

// 初始化
const initialization = () => {
  if (store.getTabs.length === 0) {
    store.insertTab({name: route.name as string, title: route.meta.title as string, path: route.path});
    store.setActiveTab(route.name as string)
  }
}

// 右键显示菜单
const left = ref<number>()
const top = ref<number>()
const isContextMenu = computed({
  set: (val) => {
    store.setIsContextMenu(val as boolean)
  }, get: () => {
    return store.getIsContextMenu
  }
})
const contextMenu = (e: any) => {
  if (e.srcElement.id) {
    left.value = e.clientX
    top.value = e.clientY + 10
    store.setIsContextMenu(true)
    store.setCurrentTabName(e.srcElement.id.substring(4, e.srcElement.id.length))
  }
}

// 右键菜单列表事件
const refreshTab = (currentTabName: string) => {
  router.push({name: currentTabName})
  removeSessionStorage()
}
const closeTab = (currentTabName: string) => {
  store.tabRemove(currentTabName)
  removeSessionStorage()
}

const closeOtherTab = (currentTabName: string) => {
  store.tabRemoveOthers(currentTabName)
  removeSessionStorage()
}

const closeAllTab = () => {
  store.tabRemoveAll()
  removeSessionStorage()
}

const mouseDown = (e: any) => {
  if (e.button === 0) {
    store.setIsContextMenu(false)
  }
}

// 清空本地存储
const removeSessionStorage = () => {
  sessionStorage.setItem('BLOG_TABS_DATA', JSON.stringify(tabs.value))
  store.setIsContextMenu(false)
}

// 刷新存储tab
const refresh = () => {
  let {name} = route// 记录当前被选中的选项卡信息
  window.addEventListener('beforeunload', () => sessionStorage.setItem('BLOG_TABS_DATA', JSON.stringify(tabs.value)));
  let sessionTabsData = sessionStorage.getItem('BLOG_TABS_DATA')
  if (sessionTabsData) {
    JSON.parse(sessionTabsData).forEach((tab: tabsTypes) => store.insertTab(tab))
    store.setActiveTab(name as string)// 设置当前选中的选项卡
  }
}

onMounted(() => {
  refresh()
  initialization()
})

</script>

<style scoped lang="scss">
.tab-parent {
  width: 100%;
  height: 30px;
}

.tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}


.contextMenu {
  width: auto;
  margin: 0;
  border: 1px solid #ccc;
  background: #ffffff;
  z-index: 2000;
  position: absolute;
  list-style-type: none;
  border-radius: 4px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #333333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);

  li {
    cursor: pointer;
    padding: 7px 16px;

    &:hover {
      background-color: rgba(100, 100, 100, 0.1);
    }
  }
}
</style>
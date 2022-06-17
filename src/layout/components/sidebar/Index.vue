<template>
  <el-scrollbar style="background-color: #304156">
    <el-menu
        :collapse="props.collapse"
        :default-active="active"
        :router="true"
        :unique-opened="true"
        active-text-color="#409EFF"
        background-color="#304156"
        text-color="#fff"
        class="menu"
    >
      <MenuItem :data="menuList"/>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import {onMounted, PropType, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {menuListData} from '../../menuList'
import {menuItem} from "../../types";

const props = defineProps({
  collapse: {
    type: Boolean as PropType<boolean>,
    required: true
  }
})

// 菜单默认选中
const route = useRoute()
const active = ref<string>('/dashboard')
const changeDefaultActive = () => active.value = route.path

// 请求数据
const menuList: menuItem[] = menuListData

// 监听路由变化设置菜单
watch(() => route.path, () => changeDefaultActive(), {deep: true, immediate: true})

// 启动
onMounted(() => changeDefaultActive())
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
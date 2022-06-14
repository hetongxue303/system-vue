<template>
  <div class="header-parent">

    <div class="left">
      <!--折叠图标-->
      <div class="collapse" @click="layoutStore.setCollapse(!layoutStore.getCollapse)">
        <el-icon :size="28">
          <component v-if="layoutStore.getCollapse" is="expand"/>
          <component v-else is="fold"/>
        </el-icon>
      </div>
      <!--面包屑-->
      <Breadcrumb/>
    </div>
    <div class="right">
      <!--搜索框-->
      <SearchBar/>
      <!--全屏-->
      <div class="FullScreen" @click="toggleFullScreen">
        <el-icon :size="20">
          <component is="FullScreen"/>
        </el-icon>
      </div>
      <!--个人中心-->
      <Center/>

    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '../../../components/breadcrumb/Index.vue'
import SearchBar from './SearchBar.vue'
import Center from './Center.vue'
import {useLayoutStore} from '../../../store/layout'

const layoutStore = useLayoutStore()

// 设置全屏
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      {
        document.exitFullscreen()
      }
    }
  }
}

</script>

<style scoped lang="scss">
.header-parent {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    .collapse {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        cursor: pointer;
        background-color: rgba(245, 245, 245, 0.8);
      }
    }
  }

  .right {
    margin-right: 22px;
    display: flex;
    align-items: center;

    .FullScreen {
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
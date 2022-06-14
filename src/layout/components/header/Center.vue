<template>
  <!--个人中心-->
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="45" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"/>
      <el-icon class="el-icon--right">
        <component is="arrow-down"/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>布局设置</el-dropdown-item>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>
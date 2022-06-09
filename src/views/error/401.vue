<template>
  <el-result
      icon="warning"
      title="401"
      sub-title="权限不足，请联系管理员！">
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>
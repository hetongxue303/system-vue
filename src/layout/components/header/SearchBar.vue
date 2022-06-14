<template>
  <!--搜索框-->
  <div class="search">
    <el-icon :size="20">
      <component is="search"/>
    </el-icon>
    <el-input placeholder="请输入搜索内容..." v-model="searchVal" @keyup.enter="search"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const searchVal = ref<String>('')

// 搜索事件
const search = () => {
  console.log(searchVal.value)
}
</script>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;

  .el-icon {
    cursor: pointer;
    margin-right: 10px;
  }

  .el-input {
    margin-right: 10px;
  }

  .el-avatar, .icon {
    cursor: pointer;
  }
}

</style>
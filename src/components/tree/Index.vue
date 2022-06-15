<template>
  <el-card>
    <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        show-checkbox
        @check-change="handleCheckChange"
    />
  </el-card>
</template>

<script setup lang="ts">
interface Tree {
  code?: string,
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: '系统管理',
    children: [
      {
        label: '用户管理', children: [
          {
            code: 'user:list',
            label: '查询用户'
          },
          {
            code: 'user:insert',
            label: '添加用户'
          },
          {
            code: 'user:delete',
            label: '删除用户'
          },
          {
            code: 'user:update',
            label: '修改用户'
          }
        ]
      },
      {label: '角色管理'},
      {label: '菜单管理'}
    ]
  },
  {
    label: '测试管理',
    children: [
      {label: '测试1'},
      {label: '测试2'},
      {label: '测试3'}
    ]
  }

]

const defaultProps = {
  children: 'children',
  label: 'label',
}

const handleCheckChange = (
    data: Tree,
    checked: boolean,
    indeterminate: boolean
) => {
  console.log(data, checked, indeterminate)
}
</script>

<style scoped lang="scss">

</style>
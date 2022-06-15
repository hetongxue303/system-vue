<template>
  <!--搜索-->
  <el-row :gutter="10" style="height: 8%">
    <el-col :span="5">
      <el-input v-model="searchVal" type="text" placeholder="请输入角色名"/>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" :icon="Search" @click="searchHandler">查询</el-button>
      <el-button type="default" :icon="Refresh" @click="searchVal=''">重置</el-button>
    </el-col>
  </el-row>
  <!--表格-->
  <el-row style="height: 84%;padding: 0;margin: 0">
    <el-table
        :data="userList"
        border
        height="537"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"/>
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="name" label="角色名"/>
      <el-table-column prop="remark" label="描述"/>
      <el-table-column prop="createUser" label="创建者">
        <template #default="scope">
          admin
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="updateTime" label="更新时间"/>
      <el-table-column label="操作" width="120" align="center">
        <template #default="scope">
          <el-button
              size="small"
              type="primary"
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"/>
          <el-button
              size="small"
              type="danger"
              :icon="Delete"
              @click="handleDelete(scope.$index, scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <!--分页组件-->
  <el-row style="height: 8%">
    <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="50"
    />
  </el-row>
</template>

<script setup lang="ts">
import {Search, Refresh, Edit, Delete} from '@element-plus/icons-vue'
import {Role} from '../../api/entity'
import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'

const searchVal = ref<string>('')

const userList = reactive<Role[]>([
  {
    id: 1,
    name: 'admin',
    remark: '超级管理员',
    createUser: 1,
    createTime: '2022-06-15 16:08:55',
    updateTime: '2022-06-15 16:08:55'
  },
  {
    id: 2,
    name: 'test',
    remark: '测试人员',
    createUser: 1,
    createTime: '2022-06-15 16:18:55',
    updateTime: '2022-06-15 16:18:55'
  }
])


const searchHandler = () => {
  console.log(searchVal.value)
  ElMessage.warning('待开发...')
}


const handleSelectionChange = (val: Role[]) => {
  const ids = reactive<number[]>([])
  val.forEach(item => ids.push(item.id))
  console.log(ids)
  ElMessage.warning('待开发...')
}


const handleEdit = (index: number, row: Role) => {
  console.log(index, row)
  ElMessage.warning('待开发...')
}


const handleDelete = (index: number, row: Role) => {
  console.log(index, row)
  ElMessage.warning('待开发...')
}
</script>

<style scoped lang="scss">

</style>
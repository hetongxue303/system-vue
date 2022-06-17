<template>
  <!--搜索-->
  <el-row :gutter="10" style="height: 7%">
    <el-col :span="5">
      <el-input v-model="searchVal" type="text" placeholder="请输入用户名"/>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" :icon="Search" @click="searchHandler">查询</el-button>
      <el-button type="default" :icon="Refresh" @click="searchVal=''">重置</el-button>
    </el-col>
  </el-row>
  <!--操作-->
  <el-row :gutter="10" style="height: 7%">
    <el-button type="success" @click="showDialog=true">添加</el-button>
  </el-row>
  <!--表格-->
  <el-row style="height: 83%;padding: 0;margin: 0">
    <el-table
        :data="userList"
        border
        height="537"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"/>
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="nickName" label="昵称"/>
      <el-table-column prop="gender" label="性别">
        <template #default="scope">
          <span v-if="scope.row.gender===0">保密</span>
          <span v-else-if="scope.row.gender===1">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作" width="120" align="center">
        <template #default="{row}">
          <el-button
              size="small"
              type="primary"
              :icon="Edit"
              @click="handleEdit(row)"/>

          <el-button
              size="small"
              type="danger"
              :icon="Delete"
              @click="handleDelete(row)"/>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <!--分页组件-->
  <el-row style="height: 3%">
    <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="50"/>
  </el-row>

  <AddUserDialog v-model="showAddDialog" show-add-dialog/>
<!--  <EditUserDialog v-model="showEditDialog" :data="userInfo" show-edit-dialog/>-->
</template>

<script setup lang="ts">
import AddUserDialog from '../../components/system/user/AddUserDialog.vue'
import EditUserDialog from '../../components/system/user/EditUserDialog.vue'
import {Search, Refresh, Edit, Delete} from '@element-plus/icons-vue'
import {User} from '../../api/entity'
import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'

const searchVal = ref<string>('')

const userList = reactive<User[]>([
  {
    id: 1,
    username: 'admin',
    nickName: '何同学',
    gender: 1,
    email: 'yhe.cq@qq.com',
    createTime: '2022-06-15 16:08:55'
  },
  {
    id: 2,
    username: 'test',
    nickName: '测试',
    gender: 2,
    email: '45865huh@qq.com',
    createTime: '2022-06-15 16:18:55'
  }
])


const searchHandler = () => {
  console.log(searchVal.value)
  ElMessage.warning('待开发...')
}


const handleSelectionChange = (val: User[]) => {
  const ids = reactive<number[]>([])
  val.forEach(item => ids.push(item.id))
  console.log(ids)
  ElMessage.warning('待开发...')
}


let userInfo = reactive<User>({})
const handleEdit = (row: User) => {
  console.log(row)
  userInfo = row
  showEditDialog.value = true
  ElMessage.warning('待开发...')
}


const handleDelete = (row: User) => {
  console.log(row)
  ElMessage.warning('待开发...')
}

/*添加*/
let showAddDialog = ref<boolean>(false)
let showEditDialog = ref<boolean>(false)
</script>

<style scoped lang="scss">

</style>
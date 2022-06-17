<template>
  <el-dialog
      :model-value="showAddDialog"
      title="添加用户"
      width="50%"
      @close="handleClose(ruleFormRef)">
    <el-form :model="userInfo" :rules="rules" ref="ruleFormRef">
      <el-row justify="center" :gutter="50">
        <el-col :span="10">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="userInfo.username"/>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="userInfo.password" type="password"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="userInfo.nickName"/>
          </el-form-item>
          <el-form-item label="用户性别" prop="gender">
            <el-select v-model="userInfo.gender">
              <el-option label="男" value="1"/>
              <el-option label="女" value="2"/>
              <el-option label="保密" value="0"/>
            </el-select>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="userInfo.realName"/>
          </el-form-item>
          <el-form-item label="用户电话" prop="phone">
            <el-input v-model="userInfo.phone"/>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose(ruleFormRef)">返回</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {PropType, reactive, ref} from 'vue'
import {FormInstance, FormRules} from "element-plus/es";
import {ElMessage} from "element-plus";

// 接收父组件的值
defineProps({
  showAddDialog: {
    type: Boolean as PropType<boolean>,
    required: true
  }
})
// 更新父组件的值
const emits = defineEmits(['update:modelValue'])
const handleClose = (formEl: FormInstance | undefined) => {
  emits('update:modelValue', false)
  if (!formEl) return
  formEl.resetFields()
}

/*表单方面*/
const userInfo = reactive({
  username: '', password: '', nickName: '', realName: '', gender: '1', phone: '', email: ''
})

// 表单校验
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '账号不能为空', trigger: 'blur'},
    {min: 4, max: 20, message: '账号长度为4到20', trigger: 'blur'}],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 8, max: 20, message: '密码长度为8到20', trigger: 'blur'}],
  realName: [{required: true, message: '真实姓名不能为空', trigger: 'blur'}],
  nickName: [{required: true, message: '用户昵称不能为空', trigger: 'blur'}],
  phone: [{required: true, message: '用户电话不能为空', trigger: 'blur'}],
  email: [{required: true, message: '用户邮箱不能为空', trigger: 'blur'}],
  gender: [{required: true, message: '用户性别不能为空', trigger: 'blur'}]
})

// 提交处理
const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      ElMessage.warning('接口待开发...')
    }
  })
}
</script>

<style scoped lang="scss">

</style>
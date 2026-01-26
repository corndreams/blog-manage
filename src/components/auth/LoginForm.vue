<template>
  <el-card class="card" shadow="always">
    <div class="logo">
      <el-icon size="40"><Box /></el-icon>
      <h2>博客</h2>
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
      <el-form-item label="用户名/邮箱" prop="username">
        <el-input v-model="form.username" placeholder="用户名/邮箱" :prefix-icon="User" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          :type="showPwd ? 'text' : 'password'"
          placeholder="密码"
          :prefix-icon="Lock"
        >
          <template #suffix>
            <el-link type="primary" @click="showPwd = !showPwd">{{ showPwd ? '隐藏' : '显示' }}</el-link>
          </template>
        </el-input>
      </el-form-item>
      <div class="actions">
        <el-link type="info" @click="onForgot">忘记密码?</el-link>
        <el-link type="primary" @click="onRegister">注册账号</el-link>
      </div>
      <el-button class="login" type="primary" size="large" @click="onSubmit" :loading="loading">登录</el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import { User, Lock, Box } from '@element-plus/icons-vue'

const router = useRouter()
const showPwd = ref(false)
const loading = ref(false)
const formRef = ref()
const form = ref({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名或邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const auth = useAuthStore()
const onSubmit = async () => {
  await formRef.value?.validate()
  loading.value = true
  try {
    await auth.signIn(form.value.username, form.value.password)
    ElMessage.success('登录成功')
    router.push('/dashboard')
  } catch (e: any) {
    ElMessage.error(e?.message || '登录失败')
  } finally {
    loading.value = false
  }
}
const onForgot = () => ElMessage.info('请联系管理员重置密码')
const onRegister = () => ElMessage.info('暂未开放注册')
</script>

<style scoped>
.card {
  border: 1px solid rgba(255,255,255,0.1);
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.06));
  box-shadow: 0 8px 24px rgba(13,110,253,0.25), inset 0 0 24px rgba(56,189,248,0.25);
  border-radius: 16px;
}
.logo { 
  display: flex;
  flex-direction: column; 
  align-items: center; 
  gap: 6px;
  margin-bottom: 8px;
}
.logo h2 { 
  margin: 0; 
  color: #0ea5e9; }
.actions { 
  display: flex; 
  justify-content: space-between; 
  margin-top: 8px; }
.login { 
  width: 100%; 
  margin-top: 12px; 
  border-radius: 24px; 
  box-shadow: 0 8px 16px rgba(14,165,233,0.35); 
}
</style>
<template>
  <el-card class="card" shadow="always">
    <div class="logo">
      <el-icon size="40"><Box /></el-icon>
      <h2>博客</h2>
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
      <el-form-item label="用户名/邮箱" prop="username">
        <el-input
          v-model="form.username"
          placeholder="用户名/邮箱"
          :prefix-icon="User"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          :type="showPwd ? 'text' : 'password'"
          placeholder="密码"
          :prefix-icon="Lock"
        >
          <template #suffix>
            <el-link type="primary" @click="showPwd = !showPwd">{{
              showPwd ? "隐藏" : "显示"
            }}</el-link>
          </template>
        </el-input>
      </el-form-item>
      <div class="actions">
        <el-link type="info" @click="onForgot">忘记密码?</el-link>
        <el-link type="primary" @click="onRegister">注册账号</el-link>
      </div>
      <el-button
        class="login"
        type="primary"
        size="large"
        @click="onSubmit"
        :loading="loading"
        >登录</el-button
      >
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ElMessage } from "element-plus";
import { User, Lock, Box } from "@element-plus/icons-vue";

const router = useRouter();
const showPwd = ref(false);
const loading = ref(false);
const formRef = ref();
const form = ref({ username: "", password: "" });
const rules = {
  username: [
    { required: true, message: "请输入用户名或邮箱", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const auth = useAuthStore();
const onSubmit = async () => {
  await formRef.value?.validate();
  loading.value = true;
  try {
    await auth.signIn(form.value.username, form.value.password);
    ElMessage.success("登录成功");
    router.push("/dashboard");
  } catch (e: any) {
    ElMessage.error(e?.message || "登录失败");
  } finally {
    loading.value = false;
  }
};
const onForgot = () => ElMessage.info("请联系管理员重置密码");
const onRegister = () => ElMessage.info("暂未开放注册");
</script>

<style scoped>
.card {
  border: 1px solid var(--wf-border-dark);
  background:
    linear-gradient(145deg, rgba(255, 252, 242, 0.14), rgba(79, 183, 165, 0.055)),
    rgba(26, 38, 33, 0.72);
  box-shadow:
    0 24px 70px rgba(8, 14, 12, 0.34),
    inset 0 1px 0 rgba(255, 252, 242, 0.1);
  border-radius: 26px;
  padding: 10px;
  backdrop-filter: blur(20px);
}
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--wf-mint);
}
.logo h2 {
  margin: 0;
  color: var(--wf-text-strong);
  font-family: Georgia, "Times New Roman", "Noto Serif SC", serif;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.login {
  width: 100%;
  margin-top: 12px;
  border-radius: 999px;
  box-shadow: 0 14px 26px rgba(79, 183, 165, 0.28);
}
</style>

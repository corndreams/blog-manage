<template>
  <el-container class="admin-layout">
    <el-aside width="220px" class="aside">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header class="header">
        <HeaderBar />
      </el-header>
      <el-main class="main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
  <el-backtop :right="30" :bottom="30" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/layout/Sidebar.vue'
import HeaderBar from '@/components/layout/HeaderBar.vue'
</script>

<style scoped>
.admin-layout {
  height: 100vh;
  background: #0f1e3a;
}
.aside {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, #0b1831, #0a1a36);
  color: #cbd5e1;
}
.header {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.main {
  padding: 16px;
}
</style>
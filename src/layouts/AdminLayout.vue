<template>
  <el-container class="admin-layout">
    <el-aside :width="asideWidth" class="aside">
      <Sidebar :collapsed="collapsed" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <HeaderBar :collapsed="collapsed" @toggle-collapse="toggleCollapse" />
      </el-header>
      <el-main class="main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
  <el-backtop :right="30" :bottom="30" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from '@/components/layout/Sidebar.vue'
import HeaderBar from '@/components/layout/HeaderBar.vue'

const collapsed = ref(false)
const asideWidth = computed(() => (collapsed.value ? '72px' : '220px'))
const toggleCollapse = () => { collapsed.value = !collapsed.value }
</script>

<style scoped>
.admin-layout {
  height: 100vh;
  background:
    radial-gradient(circle at 10% 8%, rgba(79, 183, 165, 0.2), transparent 30%),
    radial-gradient(circle at 88% 0%, rgba(215, 168, 95, 0.16), transparent 34%),
    linear-gradient(135deg, var(--wf-bg-deep), var(--wf-bg), #0e1714);
  position: relative;
  overflow: hidden;
}
.admin-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 72% 72%, rgba(158, 217, 200, 0.1), transparent 28%),
    linear-gradient(90deg, rgba(255, 252, 242, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(255, 252, 242, 0.03) 1px, transparent 1px);
  background-size: auto, 48px 48px, 48px 48px;
  opacity: 0.8;
}
.aside {
  border-right: 1px solid var(--wf-border-dark);
  background: rgba(16, 27, 23, 0.72);
  color: var(--wf-text);
  transition: width 0.2s ease;
  overflow-x: hidden;
  box-shadow: inset -1px 0 0 rgba(255, 252, 242, 0.04), 12px 0 36px rgba(8, 14, 12, 0.18);
  backdrop-filter: blur(22px);
  z-index: 1;
}
.header {
  display: flex;
  align-items: center;
  background: rgba(26, 38, 33, 0.56);
  border-bottom: 1px solid var(--wf-border-dark);
  box-shadow: 0 10px 30px rgba(8, 14, 12, 0.16);
  backdrop-filter: blur(18px);
  z-index: 1;
}
.main {
  padding: 20px;
  position: relative;
  z-index: 1;
  overflow: auto;
}
</style>
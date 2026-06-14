<template>
  <div class="sidebar" :class="{ collapsed }">
    <div class="brand">
      <!-- <el-icon size="20" class="logo"><Star /></el-icon> -->
      <img src="/src/assets/img/logo.png" alt="logo" class="logo">
      <span v-show="!collapsed" class="title">晚风漫记后台</span>
    </div>
    <el-menu
      class="menu"
      :default-active="active"
      :collapse="collapsed"
      :collapse-transition="false"
      router
      background-color="transparent"
      text-color="#cbd5e1"
      active-text-color="#ffffff"
    >
      <template v-for="item in menuItems" :key="item.path">
        <el-menu-item :index="item.path">
          <el-icon><component :is="item.iconComponent" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
  </template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { House, Document, ChatDotRound, Message, User, Collection, Edit, View, Picture, Link } from '@element-plus/icons-vue'

defineProps<{ collapsed: boolean }>()

type MenuItem = {
  path: string
  title: string
  iconComponent: any
}

const route = useRoute()
const active = computed(() => '/' + (route.path.split('/')[1] ?? 'dashboard'))

const menuItems: MenuItem[] = [
  { path: '/dashboard', title: '首页', iconComponent: House },
  { path: '/articles', title: '文章管理', iconComponent: Document },
  { path: '/comments', title: '评论管理', iconComponent: ChatDotRound },
  { path: '/messages', title: '留言管理', iconComponent: Message },
  { path: '/profile', title: '个人信息', iconComponent: User },
  { path: '/taxonomy', title: '分类/标签', iconComponent: Collection },
  { path: '/diary', title: '随记管理', iconComponent: Edit },
  { path: '/visits', title: '访问记录', iconComponent: View },
  { path: '/gallery', title: '图库', iconComponent: Picture },
  { path: '/links', title: '个人链接', iconComponent: Link },
]
</script>

<style scoped>
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 10px;
}
.brand {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  gap: 10px;
  color: var(--wf-text-strong);
  overflow: hidden;
  border-radius: 18px;
  background: rgba(255, 252, 242, 0.055);
  border: 1px solid rgba(235, 221, 188, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 252, 242, 0.08);
}
.sidebar.collapsed .brand {
  justify-content: center;
  padding: 0;
}
.title {
  font-family: Georgia, "Times New Roman", "Noto Serif SC", serif;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.04em;
}
.menu {
  border-right: none;
  margin-top: 14px;
}
.menu:not(.el-menu--collapse) {
  width: 198px;
}
.logo {
  width: 42px;
  height: 42px;
  color: var(--wf-primary);
  flex: none;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(9, 16, 14, 0.22);
}
:deep(.el-menu) {
  border-right: none;
}
:deep(.el-menu-item) {
  height: 44px;
  margin: 4px 0;
  border-radius: 14px;
  color: var(--wf-text-muted);
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
:deep(.el-menu-item:hover) {
  color: var(--wf-text-strong);
  background: rgba(255, 252, 242, 0.07);
  transform: translateX(2px);
}
:deep(.el-menu-item.is-active) {
  color: var(--wf-text-strong);
  background: linear-gradient(135deg, rgba(79, 183, 165, 0.28), rgba(215, 168, 95, 0.14));
  box-shadow: inset 0 0 0 1px rgba(158, 217, 200, 0.22), 0 10px 22px rgba(9, 16, 14, 0.16);
}
:deep(.el-menu--collapse) {
  width: 52px;
}
:deep(.el-menu--collapse .el-menu-item) {
  justify-content: center;
  padding: 0;
}
</style>

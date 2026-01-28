<template>
  <div class="sidebar">
    <div class="brand">
      <!-- <el-icon size="20" class="logo"><Star /></el-icon> -->
      <img src="/src/assets/img/logo.png" alt="logo" class="logo" style="width: 64px; height: 64px;">
      <span class="title">晚风漫记后台</span>
    </div>
    <el-menu
      class="menu"
      :default-active="active"
      router
      background-color="transparent"
      text-color="#cbd5e1"
      active-text-color="#ffffff"
    >
      <template v-for="item in menuItems" :key="item.path">
        <el-menu-item :index="item.path">
          <el-icon><component :is="item.iconComponent" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
  </template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { House, Document, ChatDotRound, Message, User, Collection, PriceTag, Edit, View, Picture, Link } from '@element-plus/icons-vue'

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
}
.brand {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  gap: 8px;
  color: #e2e8f0;
}
.title { font-weight: 600; }
.menu {
  border-right: none;
}
.logo {
  color: #60a5fa;
}
</style>

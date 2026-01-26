<template>
  <div class="header-bar">
    <el-input
      v-model="keyword"
      placeholder="搜索..."
      clearable
      class="search"
      :prefix-icon="Search"
    />
    <div class="spacer" />
    <el-button text><el-icon><Bell /></el-icon></el-button>
    <!-- <el-avatar :size="28" src="/src/assets/img/logo.png" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bell, Search } from '@element-plus/icons-vue'

const keyword = ref('')
</script>

<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}
.search { max-width: 280px; }
.spacer { flex: 1; }
</style>
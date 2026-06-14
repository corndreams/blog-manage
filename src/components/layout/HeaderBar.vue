<template>
  <div class="header-bar">
    <el-button text class="collapse-btn" @click="emit('toggleCollapse')">
      <el-icon><component :is="collapsed ? Expand : Fold" /></el-icon>
    </el-button>
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
import { Bell, Expand, Fold, Search } from '@element-plus/icons-vue'

defineProps<{ collapsed: boolean }>()
const emit = defineEmits<{ toggleCollapse: [] }>()

const keyword = ref('')
</script>

<style scoped>
.header-bar {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}
.collapse-btn {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  font-size: 18px;
  color: var(--wf-text);
  background: rgba(255, 252, 242, 0.06);
  border: 1px solid rgba(235, 221, 188, 0.1);
}
.collapse-btn:hover {
  color: var(--wf-text-strong);
  background: rgba(79, 183, 165, 0.13);
  border-color: rgba(158, 217, 200, 0.28);
}
.search {
  max-width: 300px;
}
.spacer { flex: 1; }
:deep(.el-button.is-text) {
  border-radius: 14px;
}
</style>
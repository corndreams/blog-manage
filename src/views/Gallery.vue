<template>
  <div class="gallery">
    <el-card class="toolbar" shadow="never">
      <div class="left"></div>
      <div class="right">
        <el-upload :show-file-list="false" :auto-upload="false" :on-change="onUpload">
          <el-button type="primary">上传图片</el-button>
        </el-upload>
      </div>
    </el-card>

    <el-card class="grid-card" shadow="hover">
      <el-row :gutter="16">
        <el-col v-for="item in store.list" :key="item.id" :md="6" :sm="8" :xs="24">
          <el-card shadow="hover" class="item">
            <el-image :src="item.url" fit="cover" class="thumb" />
            <div class="meta">
              <div class="name">{{ item.file_name }}</div>
              <div class="url">
                <el-input v-model="urlMap[item.id]" readonly />
                <el-button type="primary" @click="copy(item.id)">复制链接</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="pager">
        <el-pagination background layout="prev, pager, next" :total="store.total" :page-size="store.pageSize" v-model:current-page="store.page" @current-change="onPageChange" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useFilesStore } from '@/stores/files'
import { ElMessage } from 'element-plus'

const store = useFilesStore()
const urlMap = reactive<Record<number, string>>({})

onMounted(async () => {
  await store.fetch()
  store.list.forEach(i => urlMap[i.id] = i.url)
})

const onPageChange = async (p: number) => { await store.fetch(p); store.list.forEach(i => urlMap[i.id] = i.url) }
const copy = async (id: number) => { await navigator.clipboard.writeText(urlMap[id] ?? ''); ElMessage.success('已复制') }
const onUpload = async (file: any) => { const raw = file.raw as File; if (!raw) return; await store.upload(raw); store.list.forEach(i => urlMap[i.id] = i.url) }
</script>

<style scoped>
.gallery {
  color: #e2e8f0;
}

.toolbar {
  display:flex; justify-content: space-between; align-items:center; margin-bottom:12px;
}

.grid-card {
  border:none;
}

.thumb {
  width: 100%; height: 160px; object-fit: cover; border-radius: 8px;
}

.item {
  margin-bottom: 12px;
}

.meta {
  margin-top: 8px; display:flex; flex-direction: column; gap:8px;
}

.name {
  font-weight: 600;
}

.url {
  display:flex; gap:8px; align-items:center;
}

.pager {
  display:flex; justify-content:center; margin-top:12px;
}

</style>
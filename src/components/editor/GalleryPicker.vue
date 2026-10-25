<template>
  <el-dialog v-model="visible" title="选择图片" width="760px" append-to-body @open="onOpen">
    <div class="picker-head">
      <el-upload :auto-upload="false" :show-file-list="false" :on-change="onUpload">
        <el-button type="primary" :loading="uploading">
          <el-icon><Upload /></el-icon>
          上传图片
        </el-button>
      </el-upload>
      <span class="picker-count">共 {{ store.total }} 张图片</span>
    </div>

    <div v-loading="store.loading" class="picker-body">
      <div
        v-for="item in store.list"
        :key="item.id"
        class="picker-item"
        @dblclick="choose(item.url)"
      >
        <el-image :src="item.url" fit="cover" class="picker-thumb" />
        <div class="picker-meta" :title="item.file_name">{{ item.file_name }}</div>
        <el-button type="primary" size="small" @click="choose(item.url)">插入</el-button>
      </div>
      <el-empty v-if="!store.loading && !store.list.length" description="图库暂无图片" />
    </div>

    <div class="picker-footer">
      <el-pagination
        v-model:current-page="store.page"
        background
        layout="prev, pager, next"
        :total="store.total"
        :page-size="store.pageSize"
        @current-change="onPageChange"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useFilesStore } from '@/stores/files'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void
  (event: 'select', url: string): void
}>()

const store = useFilesStore()
const uploading = ref(false)
const visible = computed({
  get: () => props.visible,
  set: value => emit('update:visible', value),
})

const onOpen = async () => {
  await store.fetch(1)
}

const onPageChange = async (page: number) => {
  await store.fetch(page)
}

const onUpload = async (file: any) => {
  const raw = file.raw as File | undefined
  if (!raw) return
  uploading.value = true
  try {
    await store.upload(raw)
  } finally {
    uploading.value = false
  }
}

const choose = (url: string) => {
  if (!url) {
    ElMessage.warning('图片地址为空')
    return
  }
  emit('select', url)
  visible.value = false
}
</script>

<style scoped>
.picker-head,
.picker-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.picker-count {
  color: var(--wf-text-muted);
  font-size: 13px;
}

.picker-body {
  min-height: 300px;
  margin: 16px 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.picker-item {
  min-width: 0;
  padding: 8px;
  border: 1px solid var(--wf-border-dark);
  border-radius: 10px;
  background: rgba(255, 252, 242, 0.04);
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.picker-item:hover {
  border-color: var(--wf-primary);
  transform: translateY(-2px);
}

.picker-thumb {
  display: block;
  width: 100%;
  height: 120px;
  border-radius: 7px;
}

.picker-meta {
  overflow: hidden;
  margin: 7px 0;
  color: var(--wf-text);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .picker-body {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

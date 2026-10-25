<template>
  <el-card class="edit-card" shadow="hover">
    <h2 class="title">{{ isEdit ? '编辑随记' : '新增随记' }}</h2>
    <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="随记时间" prop="time">
        <el-date-picker
          v-model="form.time"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <BlogEditor v-model="form.content" :height="420" />
      </el-form-item>
      <div class="actions">
        <el-button type="primary" :loading="loading" @click="onSave(0)">保存</el-button>
        <el-button type="success" :loading="loading" @click="onSave(1)">发布</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useDiaryStore } from '@/stores/diary'
import BlogEditor from '@/components/editor/BlogEditor.vue'

const route = useRoute()
const router = useRouter()
const store = useDiaryStore()
const idParam = route.params.id as string | undefined
const isEdit = !!idParam
const loading = ref(false)
const formRef = ref()
const form = ref<{ id?: number; title: string; content: string; state: 0|1; time?: string }>({ id: isEdit ? Number(idParam) : undefined, title: '', content: '', state: 0, time: '' })

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'change' }],
}

onMounted(async () => {
  if (isEdit && form.value.id) {
    await store.fetchDetail(form.value.id)
    if (store.detail) {
      form.value.title = store.detail.title
      form.value.content = store.detail.content
      form.value.time = store.detail.diary_time || ''
      // form.value.state = 0
    }
  }
})

const onSave = async (state: 0|1) => {
  await formRef.value?.validate()
  loading.value = true
  await store.save({ id: form.value.id, title: form.value.title, content: form.value.content, state, time: form.value.time || undefined })
  loading.value = false
  ElMessage.success('已保存')
  router.push('/diary')
}
const onCancel = () => router.back()
</script>

<style scoped>
.edit-card {
  border: none;
  backdrop-filter: none !important;
  overflow: visible !important;
}
.edit-card:hover {
  transform: none !important;
}
.title { margin: 0 0 8px; color: #e2e8f0; }
.actions { display:flex; gap:8px; }
</style>

<template>
  <el-card class="edit-card" shadow="hover">
    <h2 class="title">{{ isEdit ? '编辑文章' : '新增文章' }}</h2>
    <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>

  <el-row :gutter="16">
    <el-col :md="12" :xs="24">
      <el-form-item label="分类" prop="category_id">
        <el-select v-model.number="form.category_id" placeholder="选择分类" filterable clearable>
          <el-option v-for="c in taxonomyStore.categories" :key="c.id" :label="c.name" :value="c.id" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :md="12" :xs="24">
      <el-form-item label="标签" prop="tags">
        <el-select v-model="form.tagIds" multiple placeholder="选择标签" filterable clearable>
          <el-option v-for="t in taxonomyStore.tags" :key="t.id" :label="t.name" :value="t.id" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="16">
    <el-col :md="12" :xs="24">
      <el-form-item label="封面" prop="cover">
        <div class="cover-wrap">
          <el-image :src="form.cover" fit="cover" class="cover" />
          <el-upload :auto-upload="false" :show-file-list="false" :on-change="onCoverChange">
            <el-button type="primary">上传封面</el-button>
          </el-upload>
          <el-input v-model="coverLink" placeholder="或粘贴封面链接" style="max-width: 320px; margin-top:8px;" />
          <el-button @click="applyCoverLink">使用链接</el-button>
        </div>
      </el-form-item>
    </el-col>
    <el-col :md="12" :xs="24">
      <el-form-item label="摘要" prop="description">
        <el-input v-model="form.description" placeholder="请输入文章摘要" />
      </el-form-item>
    </el-col>
  </el-row>

      <el-form-item label="内容" prop="content">
        <div class="editor-wrap">
          <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" class="toolbar" />
          <Editor
            v-model="form.content"
            :defaultConfig="editorConfig"
            @onCreated="handleCreated"
            class="editor"
          />
        </div>
      </el-form-item>

      <div class="actions">
        <el-button type="primary" :loading="loading" @click="onSave">保存</el-button>
        <el-button type="success" :loading="loading" @click="onPublish">发布</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, shallowRef, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { postArticleEdit, uploadImage, getArticle } from '@/api/articles'
import { useTaxonomyStore } from '@/stores/taxonomy'

const route = useRoute()
const router = useRouter()
const taxonomyStore = useTaxonomyStore()
taxonomyStore.ensureLoaded()
const idParam = route.params.id as string | undefined
const isEdit = !!idParam
const loading = ref(false)
const formRef = ref()

const initial: any = { id: isEdit ? Number(idParam) : undefined, title: '', description: '', cover: '', category_id: null, tagIds: [], status: '草稿', views: 0, tags: [], author: 'conrdreams', content: '' }

const form = ref<any>({ ...initial })

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  category_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
  content: [{ required: true, message: '请输入内容', trigger: 'change' }],
}

const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const handleCreated = (editor: any) => { editorRef.value = editor }
onBeforeUnmount(() => { const e = editorRef.value; if (e) e.destroy() })
import { onMounted } from 'vue'
onMounted(async () => {
  taxonomyStore.ensureLoaded()
  if (isEdit && form.value.id != null) {
    const resp = await getArticle(Number(form.value.id))
    const d = resp.data
    form.value.title = d.title || ''
    form.value.description = d.description || ''
    form.value.content = d.content || ''
    form.value.cover = d.cover || ''
    form.value.category_id = d.category_id
    form.value.tagIds = (d.tags || []).map(t => t.id)
  }
})

const onSave = async () => {
  await formRef.value?.validate()
  loading.value = true
  const payload: any = {
    title: form.value.title,
    description: form.value.description || '',
    content: form.value.content || '',
    cover: form.value.cover || '',
    category_id: Number(form.value.category_id || 0),
    tagIds: (form.value.tagIds || []).map((n: any) => Number(n)),
    state: 0 as 0|1,
  }
  if (isEdit && form.value.id != null) payload.id = form.value.id
  await postArticleEdit(payload)
  loading.value = false
  ElMessage.success('已保存')
  router.push('/articles')
}

const onPublish = async () => {
  await formRef.value?.validate()
  loading.value = true
  const payload: any = {
    title: form.value.title,
    description: form.value.description || '',
    content: form.value.content || '',
    cover: form.value.cover || '',
    category_id: Number(form.value.category_id || 0),
    tagIds: (form.value.tagIds || []).map((n: any) => Number(n)),
    state: 1 as 0|1,
  }
  if (isEdit && form.value.id != null) payload.id = form.value.id
  await postArticleEdit(payload)
  loading.value = false
  ElMessage.success('已发布')
  router.push('/articles')
}

const onCancel = () => router.back()

const onCoverChange = async (file: any) => {
  const raw = file.raw as File
  if (!raw) return
  const reader = new FileReader()
  reader.onload = async () => {
    const dataUrl = String(reader.result)
    const res = await uploadImage(raw.name, dataUrl)
    form.value.cover = res.data.url
  }
  reader.readAsDataURL(raw)
}
const coverLink = ref('')
const applyCoverLink = () => { if (coverLink.value) form.value.cover = coverLink.value.trim() }
</script>

<style scoped>
.edit-card { 
  border: none;
}
.title { margin: 0 0 8px; color: #e2e8f0; }
.editor-wrap { display: block; }
.toolbar { border: 1px solid rgba(255,255,255,0.1); border-bottom: none; border-radius: 8px 8px 0 0; display:block; }
.editor { border: 1px solid rgba(255,255,255,0.1); height: 420px; overflow-y: auto; border-radius: 0 0 8px 8px; background: rgba(255,255,255,0.04); display:block; }
.actions { display: flex; gap: 8px; }
</style>
<style>
#editor—wrapper {
  border: 1px solid #ccc;
  z-index: 100;
  /* 按需定义 */
}

#toolbar-container {
  border-bottom: 1px solid #ccc;
}

#editor-container {
  height: 500px;
}
</style>
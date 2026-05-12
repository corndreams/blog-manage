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
          <div class="editor-actions">
            <el-upload
              :auto-upload="false"
              :show-file-list="false"
              accept=".md,.markdown"
              :on-change="onMdChange"
            >
              <el-button type="primary" plain>导入MD</el-button>
            </el-upload>
          </div>
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
import { ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
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

const markdown = new MarkdownIt({ html: true, linkify: true, breaks: true })

const unquote = (s: string) => {
  const v = s.trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1)
  return v
}

const parseTagNames = (v: unknown): string[] => {
  if (v == null) return []
  if (Array.isArray(v)) return v.map(x => String(x).trim()).filter(Boolean)
  const s = String(v).trim()
  if (!s) return []
  const raw = unquote(s)
  if (raw.startsWith('[') && raw.endsWith(']')) {
    return raw.slice(1, -1).split(',').map(t => unquote(t).trim()).filter(Boolean)
  }
  if (raw.includes(',')) return raw.split(',').map(t => unquote(t).trim()).filter(Boolean)
  if (raw.includes(' ')) return raw.split(' ').map(t => unquote(t).trim()).filter(Boolean)
  return [raw]
}

const extractExcerpt = (md: string) => {
  const beforeMore = md.split('<!--more-->')[0] || ''
  const cleaned = beforeMore
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/[*_`>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned
}

const readFileAsText = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()
  reader.onerror = () => reject(new Error('读取文件失败'))
  reader.onload = () => resolve(String(reader.result || ''))
  reader.readAsText(file, 'utf-8')
})

const resolveCategoryId = (v: unknown) => {
  const s = unquote(String(v ?? '')).trim()
  if (!s) return null
  if (/^\d+$/.test(s)) return Number(s)
  const hit = taxonomyStore.categories.find(c => c.name === s) || taxonomyStore.categories.find(c => c.name.toLowerCase() === s.toLowerCase())
  return hit?.id ?? null
}

const resolveTagIds = (names: string[]) => {
  const ids: number[] = []
  const missing: string[] = []
  for (const n of names) {
    const name = n.trim()
    if (!name) continue
    const hit = taxonomyStore.tags.find(t => t.name === name) || taxonomyStore.tags.find(t => t.name.toLowerCase() === name.toLowerCase())
    if (hit) ids.push(hit.id)
    else missing.push(name)
  }
  return { ids: Array.from(new Set(ids)), missing }
}

const onMdChange = async (file: any) => {
  const raw = file.raw as File
  if (!raw) return
  try {
    await taxonomyStore.ensureLoaded()
    const mdText = await readFileAsText(raw)
    const parsed = matter(mdText)
    const data: any = parsed.data || {}
    const content = String(parsed.content || '')

    const title = data.title ? unquote(data.title) : ''
    const cover = data.cover ? unquote(data.cover) : ''
    const description = data.description ? unquote(data.description) : (data.summary ? unquote(data.summary) : '')
    const categoryVal = data.category ?? data.categories ?? data.category_name ?? ''
    const tagVal = data.tags ?? data.tag ?? ''

    if (title) form.value.title = title
    if (cover) form.value.cover = cover
    if (description) form.value.description = description

    if (categoryVal) {
      const cid = resolveCategoryId(categoryVal)
      if (cid != null) form.value.category_id = cid
      else ElMessage.warning(`未找到分类：${unquote(String(categoryVal))}`)
    }

    const tagNames = parseTagNames(tagVal)
    if (tagNames.length) {
      const { ids, missing } = resolveTagIds(tagNames)
      if (ids.length) form.value.tagIds = ids
      if (missing.length) ElMessage.warning(`未找到标签：${missing.join('、')}`)
    }

    if (!form.value.description) {
      const excerpt = extractExcerpt(content)
      if (excerpt) form.value.description = excerpt.slice(0, 200)
    }

    const body = content.replace(/<!--more-->/g, '').trim()
    form.value.content = markdown.render(body)
    ElMessage.success('已导入MD')
  } catch (e: any) {
    ElMessage.error(e?.message || '导入失败')
  }
}

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
.editor-actions { display: flex; justify-content: flex-end; margin-bottom: 8px; }
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

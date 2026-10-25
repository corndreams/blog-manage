<template>
  <div class="blog-editor">
    <div class="blog-editor__bar">
      <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" class="editor-toolbar" />
      <el-button
        v-if="showGallery"
        class="gallery-button"
        text
        @mousedown.prevent="openGallery"
      >
        <el-icon><Picture /></el-icon>
        图库
      </el-button>
    </div>

    <Editor
      v-model="value"
      :defaultConfig="editorConfig"
      :style="{ minHeight: editorHeight }"
      @onCreated="handleCreated"
      class="editor"
    />

    <GalleryPicker v-model:visible="galleryVisible" @select="insertFromGallery" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import { ElMessage } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uploadImage } from '@/api/articles'
import GalleryPicker from './GalleryPicker.vue'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  height?: number | string
  showGallery?: boolean
}>(), {
  placeholder: '请输入内容...',
  height: 420,
  showGallery: true,
})

const emit = defineEmits<{ (event: 'update:modelValue', value: string): void }>()

const value = computed({
  get: () => props.modelValue,
  set: nextValue => emit('update:modelValue', nextValue),
})

const editorHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height
)
const editorRef = shallowRef<any>()
const galleryVisible = ref(false)
const savedSelection = ref<any>(null)
const toolbarConfig = {}

const readAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()
  reader.onerror = () => reject(new Error('读取图片失败'))
  reader.onload = () => resolve(String(reader.result || ''))
  reader.readAsDataURL(file)
})

const editorConfig: any = {
  placeholder: props.placeholder,
  MENU_CONF: {
    uploadImage: {
      async customUpload(fileOrFiles: any, insertImgFn: (url: string) => void) {
        const files: File[] = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]
        for (const file of files) {
          try {
            const dataUrl = await readAsDataUrl(file)
            const response = await uploadImage(file.name, dataUrl)
            insertImgFn(response.data.url)
          } catch (error: any) {
            ElMessage.error(error?.message || '图片上传失败')
          }
        }
      },
    },
  },
}

const handleCreated = (editor: any) => {
  editorRef.value = editor
}

const openGallery = () => {
  savedSelection.value = editorRef.value?.getSelection?.() || null
  galleryVisible.value = true
}

const insertFromGallery = (url: string) => {
  const editor = editorRef.value
  if (!editor) return
  if (savedSelection.value) editor.restoreSelection(savedSelection.value)
  editor.insertNode({
    type: 'image',
    src: url,
    alt: '',
    href: '',
    style: { maxWidth: '100%' },
    children: [{ text: '' }],
  })
  editor.focus()
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) editor.destroy()
})
</script>

<style scoped>
.blog-editor {
  width: 100%;
  overflow: visible;
  border: 1px solid rgba(235, 221, 188, 0.14);
  border-radius: 18px;
  background: rgba(255, 252, 242, 0.055);
}

.blog-editor__bar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: stretch;
  border-radius: 18px 18px 0 0;
  background: rgba(252, 244, 224, 0.99);
  box-shadow: 0 4px 12px rgba(10, 18, 15, 0.08);
}

.editor-toolbar {
  min-width: 0;
  flex: 1;
}

.gallery-button {
  flex: 0 0 auto;
  align-self: center;
  margin: 0 8px;
  color: var(--wf-ink) !important;
}

.gallery-button:hover {
  color: var(--wf-primary-strong) !important;
  background: rgba(79, 183, 165, 0.12) !important;
}

.editor {
  display: block;
  border: none !important;
  border-radius: 0 0 18px 18px !important;
  overflow: visible;
  background: rgba(252, 244, 224, 0.86) !important;
}

.blog-editor :deep(.w-e-text-container),
.blog-editor :deep(.w-e-scroll),
.blog-editor :deep([data-slate-editor]) {
  height: auto !important;
  min-height: inherit;
  overflow-y: visible !important;
}

.blog-editor :deep(.w-e-bar),
.blog-editor :deep(.w-e-toolbar),
.blog-editor :deep(.w-e-bar-item button),
.blog-editor :deep(.w-e-modal),
.blog-editor :deep(.w-e-select-list),
.blog-editor :deep(.w-e-drop-panel) {
  color: var(--wf-ink) !important;
}

.blog-editor :deep(.w-e-bar svg),
.blog-editor :deep(.w-e-modal .btn-close svg) {
  fill: var(--wf-ink) !important;
}

.blog-editor :deep(.w-e-select-list),
.blog-editor :deep(.w-e-drop-panel),
.blog-editor :deep(.w-e-modal) {
  background: rgba(252, 244, 224, 0.98) !important;
  border-color: rgba(97, 84, 57, 0.28) !important;
}

.blog-editor :deep(.w-e-bar-item button:hover),
.blog-editor :deep(.w-e-select-list ul li:hover),
.blog-editor :deep(.w-e-select-list ul .selected) {
  color: var(--wf-primary-strong) !important;
  background: rgba(79, 183, 165, 0.16) !important;
}
</style>

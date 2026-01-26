<template>
  <div class="profile">
    <el-card class="card" shadow="hover">
      <h2 class="title">个人信息</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="96px" v-loading="store.loading">
        <el-row :gutter="16">
          <el-col :md="6" :xs="24">
            <el-form-item label="头像" prop="avatar">
          <div class="avatar-wrap">
            <el-image :src="form.avatar" fit="cover" class="avatar" />
            <el-upload :auto-upload="false" :show-file-list="false" :on-change="onAvatarChange">
              <el-button type="primary">更换头像</el-button>
            </el-upload>
            <el-input v-model="avatarLink" placeholder="或粘贴头像链接" style="max-width: 320px" />
            <el-button @click="applyAvatarLink">使用链接</el-button>
          </div>
            </el-form-item>
          </el-col>
          <el-col :md="18" :xs="24">
            <el-row :gutter="16">
              <el-col :md="12" :xs="24">
                <el-form-item label="名字" prop="name">
                  <el-input v-model="form.name" placeholder="请输入名字" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :xs="24">
                <el-form-item label="一句话介绍" prop="tagline">
                  <el-input v-model="form.tagline" placeholder="一句话介绍" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :xs="24">
                <el-form-item label="名言" prop="quote">
                  <el-input v-model="form.quote" placeholder="名言展示" />
                </el-form-item>
              </el-col>
              <el-col :md="12" :xs="24">
                <el-form-item label="MBTI" prop="mbti">
                  <el-select v-model="form.mbti" filterable>
                    <el-option v-for="m in mbtiOptions" :key="m.value" :label="m.label" :value="m.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :xs="24">
                <el-form-item label="MBTI介绍" prop="mbti_intro">
                  <div class="editor-wrap">
                    <Toolbar :editor="editorIntroRef" :defaultConfig="toolbarConfig" class="toolbar" />
                    <Editor
                      v-model="form.mbti_intro"
                      :defaultConfig="editorConfig"
                      @onCreated="handleIntroCreated"
                      class="editor"
                    />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-form-item label="个人介绍" prop="about">
          <div class="editor-wrap">
            <Toolbar :editor="editorAboutRef" :defaultConfig="toolbarConfig" class="toolbar" />
            <Editor
              v-model="form.about"
              :defaultConfig="editorConfig"
              @onCreated="handleAboutCreated"
              class="editor"
            />
          </div>
        </el-form-item>

        

        <div class="actions">
          <el-button type="primary" :loading="loading" @click="onSave">保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, onBeforeUnmount } from 'vue'
import { mbtiOptions } from '@/data/profile'
import { useProfileStore } from '@/stores/profile'
import { updateUserInfo } from '@/api/users'
import { uploadImage } from '@/api/articles'
import { ElMessage } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const store = useProfileStore()
const formRef = ref()
const form = ref<any>({ avatar: '', name: '', tagline: '', quote: '', mbti: '', mbti_intro: '', about: '' })
const loading = ref(false)

const editorIntroRef = shallowRef()
const editorAboutRef = shallowRef()
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const handleIntroCreated = (editor: any) => { editorIntroRef.value = editor }
const handleAboutCreated = (editor: any) => { editorAboutRef.value = editor }
onBeforeUnmount(() => { const a = editorIntroRef.value; if (a) a.destroy(); const b = editorAboutRef.value; if (b) b.destroy() })

const rules = {
  name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  tagline: [{ required: true, message: '请输入一句话介绍', trigger: 'blur' }],
  mbti: [{ required: true, message: '请选择 MBTI', trigger: 'change' }],
}

const onAvatarChange = (file: any) => {
  const raw = file.raw as File
  if (!raw) return
  const reader = new FileReader()
  reader.onload = async () => {
    const dataUrl = String(reader.result)
    const res = await uploadImage(raw.name, dataUrl)
    form.value.avatar = res.data.url
  }
  reader.readAsDataURL(raw)
}

const avatarLink = ref('')
const applyAvatarLink = () => { if (avatarLink.value) form.value.avatar = avatarLink.value.trim() }


const onSave = async () => {
  await formRef.value?.validate()
  loading.value = true
  try {
    await updateUserInfo({
      avatar: form.value.avatar || '',
      name: form.value.name,
      tagline: form.value.tagline || '',
      quote: form.value.quote || '',
      mbti: form.value.mbti || '',
      mbti_intro: form.value.mbti_intro || '',
      about: form.value.about || '',
    })
    ElMessage.success('保存成功')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await store.fetchInfo()
  if (store.info) {
    form.value.avatar = store.info.avatar || ''
    form.value.name = store.info.name || ''
    form.value.tagline = store.info.tagline || ''
    form.value.quote = store.info.quote || ''
    form.value.mbti = store.info.mbti || ''
    form.value.mbti_intro = store.info.mbti_intro || ''
    form.value.about = store.info.about || ''
  }
})
</script>

<style scoped>
.profile { 
  color: #e2e8f0;
}
.card { 
  border: none;
}
.title {
  margin: 0 0 8px;
}
.avatar-wrap {
  line-height: 40px;
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
}
.goal-add {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.actions {
  display: flex;
  gap: 8px;
}
.editor-wrap {
  display: block;
  margin-top: 4px;
}
.toolbar {
  border: 1px solid rgba(255,255,255,0.1);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  display: block;
}
.editor {
  border: 1px solid rgba(255,255,255,0.1);
  height: 280px;
  overflow-y: auto;
  border-radius: 0 0 8px 8px;
  background: rgba(255,255,255,0.04);
  display: block;
}
</style>
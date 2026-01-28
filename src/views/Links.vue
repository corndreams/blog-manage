<template>
  <div class="links">
    <el-card class="toolbar" shadow="never">
      <div class="left">
        <el-button type="primary" @click="onCreate">新增链接</el-button>
      </div>
    </el-card>

    <el-card class="table-card" shadow="hover">
      <el-table :data="store.list" stripe height="520" v-loading="store.loading">
        <el-table-column prop="name" label="名称" min-width="180" />
        <el-table-column label="图标" width="120">
          <template #default="{ row }">
            <el-image v-if="row.icon" :src="row.icon" fit="cover" style="width:28px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,0.1)" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="链接" min-width="220">
          <template #default="{ row }">
            <el-link :href="row.url" type="primary" target="_blank">{{ row.url }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180" />
        <el-table-column prop="updated_at" label="更新时间" width="180" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="onEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="visible" title="编辑链接" width="520px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="92px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="例如：Bilibili" />
        </el-form-item>
        <el-form-item label="图标地址" prop="icon">
          <el-input v-model="form.icon" placeholder="可选，图标图片链接" />
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="form.url" placeholder="例如：https://space.bilibili.com/xxx" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible=false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="onSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useLinksStore } from '@/stores/links'

const store = useLinksStore()
const visible = ref(false)
const saving = ref(false)
const formRef = ref()
const form = ref<{ id?: number; name: string; icon?: string; url: string }>({ name: '', icon: '', url: '' })

const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  url: [{ required: true, message: '请输入链接', trigger: 'blur' }],
}

onMounted(() => { store.fetch() })

const onCreate = () => {
  store.setEditing(null)
  form.value = { name: '', icon: '', url: '' }
  visible.value = true
}

const onEdit = (row: any) => {
  store.setEditing(row)
  form.value = { id: row.id, name: row.name || '', icon: row.icon || '', url: row.url || '' }
  visible.value = true
}

const onSave = async () => {
  await formRef.value?.validate()
  saving.value = true
  await store.save({ id: form.value.id, name: form.value.name, icon: form.value.icon || undefined, url: form.value.url })
  saving.value = false
  visible.value = false
  ElMessage.success('已保存')
}
</script>

<style scoped>
.links { color: #e2e8f0; }
.toolbar { display:flex; justify-content: space-between; align-items:center; margin-bottom:12px; }
.table-card { border:none; }
</style>

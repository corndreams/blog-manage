<template>
  <div class="taxonomy">
    <el-card class="toolbar" shadow="never">
      <div class="left">
        <el-radio-group v-model="activeType" size="small">
          <el-radio-button label="category">分类</el-radio-button>
          <el-radio-button label="tag">标签</el-radio-button>
        </el-radio-group>
      </div>
      <div class="right">
        <el-input v-model="keyword" placeholder="搜索名称/别名" :prefix-icon="Search" clearable style="width: 260px;" />
      </div>
    </el-card>

    <el-row :gutter="16">
      <el-col :md="8" :xs="24">
        <el-card class="form-card" shadow="hover">
          <h3>{{ activeType === 'category' ? '新增分类' : '新增标签' }}</h3>
          <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
            <el-form-item label="名称" prop="name"><el-input v-model="form.name" /></el-form-item>
            <el-form-item label="别名" prop="slug"><el-input v-model="form.slug" /></el-form-item>
            <el-form-item label="描述" prop="desc"><el-input v-model="form.desc" type="textarea" :rows="4" /></el-form-item>
            <el-button type="primary" @click="onAdd" :disabled="!form.name">添加{{ activeType === 'category' ? '分类' : '标签' }}</el-button>
          </el-form>
        </el-card>
      </el-col>

      <el-col :md="16" :xs="24">
        <el-card class="table-card" shadow="hover">
          <el-table :data="paged" stripe @selection-change="onSelChange" height="520">
            <el-table-column type="selection" width="48" />
            <el-table-column prop="name" label="名称" min-width="160" />
            <el-table-column prop="desc" label="描述" min-width="220" />
            <el-table-column prop="slug" label="别名" width="160" />
            <el-table-column label="总数" width="100">
              <template #default="{ row }"><span>{{ countOf(row) }}</span></template>
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
              <template #default="{ row }">
                <el-button size="small" @click="editItem(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="removeItem(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="tbl-actions">
            <el-button type="danger" :disabled="selected.length===0" @click="bulkRemove">批量删除</el-button>
            <el-pagination background layout="prev, pager, next" :total="filtered.length" :page-size="pageSize" v-model:current-page="page" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="editVisible" title="编辑" width="480px">
      <el-form :model="edit" label-position="top">
        <el-form-item label="名称"><el-input v-model="edit.name" /></el-form-item>
        <el-form-item label="别名"><el-input v-model="edit.slug" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="edit.desc" type="textarea" :rows="4" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible=false">取消</el-button>
        <el-button type="primary" @click="onEditSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useTaxonomyStore } from '@/stores/taxonomy'
import { postTagEdit } from "@/api/taxonomy";

const store = useTaxonomyStore()
const activeType = ref<'category' | 'tag'>('category')
const keyword = ref('')
const formRef = ref()
const form = ref<{ name: string; slug: string; desc?: string }>({ name: '', slug: '', desc: '' })
const rules = { name: [{ required: true, message: '请输入名称', trigger: 'blur' }] }

const page = ref(1)
const pageSize = 10
const selected = ref<any[]>([])

onMounted(() => { store.fetchCategories(); store.fetchTags() })
watch(activeType, () => { page.value = 1 })

const list = computed(() => activeType.value === 'category' ? store.categories : store.tags)
const filtered = computed(() => list.value.filter(i => !keyword.value || `${i.name}${i.alias}`.toLowerCase().includes(keyword.value.toLowerCase())))
const paged = computed(() => { const s = (page.value-1)*pageSize; return filtered.value.slice(s, s+pageSize) })

const onSelChange = (rows: any[]) => { selected.value = rows }
const countOf = (row: any) => row.article_count ?? 0

const onAdd = async () => {
  await formRef.value?.validate()
  // loading.value = true
  const payload: any = {
    name: form.value.name,
    alias: form.value.slug || '',
    desc: form.value.desc || '',
  }
  if (activeType.value === 'category') {
    // await postCategoryAdd(payload)
  } else {
    await postTagEdit(payload)
  }

  // loading.value = false
  ElMessage.success('新增成功')
  store.fetchCategories(); store.fetchTags()
}

const editVisible = ref(false)
const edit = ref<any>({})
const editItem = (row: any) => { edit.value = { ...row }; editVisible.value = true }
const onEditSave = () => { editVisible.value = false; ElMessage.success('保存成功（示例）') }
const removeItem = async (row: any) => { ElMessage.info('删除接口未连接，此操作仅示例') }
const bulkRemove = async () => { ElMessage.info('批量删除接口未连接，此操作仅示例') }
</script>

<style scoped>
.taxonomy { color: #e2e8f0; }
.toolbar { display:flex; justify-content: space-between; align-items:center; margin-bottom:12px; }
.form-card { border:none; }
.table-card { border:none; }
.tbl-actions { display:flex; justify-content: space-between; align-items:center; margin-top:12px; }
</style>
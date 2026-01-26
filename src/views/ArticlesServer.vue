<template>
  <div class="articles">
    <el-card class="toolbar" shadow="never">
      <div class="left">
        <el-button type="primary" :icon="Plus" @click="onCreate">新增文章</el-button>
      </div>
      <div class="right">
        <el-input v-model="keyword" placeholder="搜索标题" :prefix-icon="Search" clearable />
      </div>
    </el-card>

    <el-card class="table-card" shadow="hover">
      <el-table :data="filtered" stripe height="520" v-loading="store.loading">
        <el-table-column prop="title" label="标题" min-width="220" />
        <el-table-column prop="category_name" label="分类" width="120" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="store.statusType(row.state)">{{ store.statusText(row.state) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="阅读量" width="100" />
        <el-table-column prop="updated_at" label="更新时间" width="160" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="edit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pager">
        <el-pagination background layout="prev, pager, next" :total="store.total" :page-size="store.pageSize" v-model:current-page="store.page" @current-change="onPageChange" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'

const router = useRouter()
const store = useArticlesStore()
const keyword = ref('')

onMounted(() => { store.fetch() })

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  return store.list.filter(a => !k || a.title.toLowerCase().includes(k))
})

const onPageChange = (p: number) => { store.fetch({ page: p }) }
const edit = (row: any) => router.push(`/articles/edit/${row.id}`)
const onCreate = () => router.push('/articles/edit')
</script>

<style scoped>
.articles { color: #e2e8f0; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.left { display: flex; gap: 12px; align-items: center; }
.right { width: 260px; }
.table-card { border: none; }
.pager { display: flex; justify-content: center; margin-top: 12px; }
</style>
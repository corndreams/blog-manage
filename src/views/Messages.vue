<template>
  <div class="messages">
    <el-card class="toolbar" shadow="never">
      <div class="left">
        <el-input v-model="keyword" placeholder="搜索用户/内容" :prefix-icon="Search" clearable style="width: 260px;" />
      </div>
      <div class="right">
        <el-button type="danger" @click="bulkRemove" :disabled="selected.length === 0">批量删除</el-button>
      </div>
    </el-card>

    <el-card class="table-card" shadow="hover">
      <el-table :data="filtered" stripe @selection-change="onSelectionChange" height="520" v-loading="store.loading">
        <el-table-column type="selection" width="48" />
        <el-table-column prop="content" label="内容" min-width="420">
          <template #default="{ row }">
            <span class="ellipsis">{{ row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户" width="120" />
        <el-table-column prop="ip" label="IP" width="140" />
        <el-table-column prop="created_at" label="时间" width="180" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="danger" @click="remove(row)">删除</el-button>
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
import { ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useMessagesStore } from '@/stores/messages'

const store = useMessagesStore()
const selected = ref<number[]>([])
const keyword = ref('')

onMounted(() => { store.fetch() })

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  return store.list.filter(m => !k || `${m.name}${m.content}`.toLowerCase().includes(k))
})

const onSelectionChange = (rows: any[]) => { selected.value = rows.map(r => r.id) }
const remove = async (row: any) => {
  await ElMessageBox.confirm(`删除该留言？`, '提示', { type: 'warning' })
  await store.remove(row.id)
}

const bulkRemove = async () => {
  await ElMessageBox.confirm(`批量删除 ${selected.value.length} 条？`, '提示', { type: 'warning' })
  await store.bulkRemove(selected.value)
  selected.value = []
}

const onPageChange = (p: number) => { store.fetch({ page: p }) }
</script>

<style scoped>
.messages { color: #e2e8f0; }
.toolbar { display:flex; justify-content: space-between; align-items:center; margin-bottom:12px; }
.left { display:flex; gap:12px; align-items:center; }
.right { display:flex; gap:8px; align-items:center; }
.table-card { border:none; }
.pager { display:flex; justify-content:center; margin-top:12px; }
.ellipsis { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient: vertical; overflow:hidden; }
</style>
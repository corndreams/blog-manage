<template>
  <div class="diary">
    <el-card class="toolbar" shadow="never">
      <div class="left"></div>
      <div class="right">
        <el-button type="primary" :icon="Plus" @click="onCreate">新增随记</el-button>
      </div>
    </el-card>

    <el-card class="table-card" shadow="hover">
      <el-table :data="store.list" stripe height="520" v-loading="store.loading">
        <el-table-column prop="title" label="标题" min-width="220" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.state === 1 ? 'success' : 'warning'">{{ row.state === 1 ? '已发布' : '草稿' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="diary_time" label="随记时间" width="180" />
        <el-table-column prop="created_at" label="创建时间" width="180" />
        <el-table-column prop="updated_at" label="更新时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="edit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="onDelete(row)">删除</el-button>
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
import { onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useDiaryStore } from '@/stores/diary'

const router = useRouter()
const store = useDiaryStore()

onMounted(() => { store.fetchList() })

const onPageChange = (p: number) => { store.fetchList(p) }
const edit = (row: any) => router.push(`/diary/edit/${row.id}`)
const onCreate = () => router.push('/diary/edit')
import { ElMessageBox, ElMessage } from 'element-plus'
const onDelete = async (row: any) => {
  await ElMessageBox.confirm('确认删除该随记？', '提示', { type: 'warning' })
  await store.remove(row.id)
  ElMessage.success('已删除')
}
</script>

<style scoped>
.diary { color: #e2e8f0; }
.toolbar { display:flex; justify-content: space-between; align-items:center; margin-bottom:12px; }
.table-card { border:none; }
.pager { display:flex; justify-content:center; margin-top:12px; }
</style>
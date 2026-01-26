<template>
  <div class="visits">
    <el-card class="toolbar" shadow="never">
      <div class="left">
        <el-date-picker v-model="date" type="date" placeholder="选择日期" @change="onDateChange" />
      </div>
    </el-card>
    <el-card class="table-card" shadow="hover">
      <el-table :data="store.list" stripe height="520" v-loading="store.loading">
        <el-table-column prop="path" label="路径" min-width="200" />
        <el-table-column prop="ip" label="IP" width="140" />
        <el-table-column prop="device" label="设备" width="120" />
        <el-table-column prop="user_agent" label="UA" min-width="260" />
        <el-table-column prop="created_at" label="时间" width="180" />
      </el-table>
      <div class="pager">
        <el-pagination background layout="prev, pager, next" :total="store.total" :page-size="store.pageSize" v-model:current-page="store.page" @current-change="onPageChange" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVisitsStore } from '@/stores/visits'

const store = useVisitsStore()
const date = ref<Date>(new Date())

onMounted(() => { store.fetch(1, date.value) })

const onDateChange = (d: Date) => { store.fetch(1, d) }
const onPageChange = (p: number) => { store.fetch(p, date.value) }
</script>

<style scoped>
.visits { color: #e2e8f0; }
.toolbar { display:flex; justify-content: space-between; align-items:center; margin-bottom:12px; }
.table-card { border:none; }
.pager { display:flex; justify-content:center; margin-top:12px; }
</style>
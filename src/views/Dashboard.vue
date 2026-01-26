<template>
  <div class="dashboard">
    <el-row :gutter="16">
      <el-col :md="6" :sm="12" :xs="24">
        <el-card shadow="hover" class="stat-card stat-blue">
          <div class="stat-title">文章总数</div>
          <div class="stat-value">{{ summary.articles }}</div>
        </el-card>
      </el-col>
      <el-col :md="6" :sm="12" :xs="24">
        <el-card shadow="hover" class="stat-card stat-orange">
          <div class="stat-title">随记总数</div>
          <div class="stat-value">{{ summary.diaries }}</div>
        </el-card>
      </el-col>
      <el-col :md="6" :sm="12" :xs="24">
        <el-card shadow="hover" class="stat-card stat-pink">
          <div class="stat-title">评论总数</div>
          <div class="stat-value">{{ summary.comments }}</div>
        </el-card>
      </el-col>
      <el-col :md="6" :sm="12" :xs="24">
        <el-card shadow="hover" class="stat-card stat-green">
          <div class="stat-title">留言总数</div>
          <div class="stat-value">{{ summary.messages }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" style="margin-top:16px;">
      <el-col :md="24" :xs="24">
        <el-card shadow="hover" style="height: 500px">
          <div class="chart-toolbar">
            <el-select v-model="period" size="small" style="width:120px">
              <el-option label="近一周" value="week" />
              <el-option label="近一年" value="year" />
            </el-select>
          </div>
          <div ref="chartRef" class="echart" />
        </el-card>
      </el-col>
      <!-- <el-col :md="8" :xs="24">
        <el-card shadow="hover" style="height: 320px">
          <div class="chart-placeholder">趋势热区占位</div>
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect, onMounted } from 'vue'
import { getSummary, getVisitsVolume, getVisitorsVolume } from '@/api/dashboard'
import * as echarts from 'echarts'

const summary = reactive<{ articles: number; diaries: number; comments: number; messages: number }>({ articles: 0, diaries: 0, comments: 0, messages: 0 })
onMounted(async () => {
  const resp = await getSummary()
  summary.articles = resp.data.articles
  summary.diaries = resp.data.diaries
  summary.comments = resp.data.comments
  summary.messages = resp.data.messages
})

const period = ref<'week'|'year'>('week')
const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    chart.resize()
  }
})

watchEffect(async () => {
  const visits = await getVisitsVolume(period.value)
  const visitors = await getVisitorsVolume(period.value)
  const labels = visits.data.map(v => v.label)
  const visitsData = visits.data.map(v => v.count)
  const visitorsData = visitors.data.map(v => v.count)
  if (chart) {
    chart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['访问量','访客量'], top: 10, left: 'center', textStyle: { color: '#cbd5e1' } },
      grid: { left: 50, right: 30, top: 80, bottom: 30, containLabel: true },
      xAxis: { type: 'category', data: labels, axisLabel: { color: '#9ca3af' } },
      yAxis: { type: 'value', axisLabel: { color: '#9ca3af' } },
      series: [
        { name: '访问量', type: 'line', smooth: true, symbolSize: 6, areaStyle: { opacity: 0.15 }, data: visitsData },
        { name: '访客量', type: 'line', smooth: true, symbolSize: 6, areaStyle: { opacity: 0.15 }, data: visitorsData },
      ],
    })
  }
})
</script>

<style scoped>
.dashboard { color: #e2e8f0; }
.stat-card { border: none; }
.stat-title { font-size: 14px; opacity: 0.8; }
.stat-value { font-size: 32px; font-weight: 700; margin-top: 8px; }
.stat-blue { background: linear-gradient(135deg,#2a6cf6,#3b82f6); color: #fff; }
.stat-orange { background: linear-gradient(135deg,#ef6c00,#f59e0b); color: #fff; }
.stat-pink { background: linear-gradient(135deg,#e91e63,#f472b6); color: #fff; }
.stat-green { background: linear-gradient(135deg,#10b981,#22c55e); color: #fff; }
.chart-placeholder { height: 100%; display:flex; align-items:center; justify-content:center; opacity:0.7; }
.chart-toolbar { display:flex; justify-content: space-between; align-items:center; margin-bottom:8px; }
.echart { width:100%; height: 400px; }
</style>
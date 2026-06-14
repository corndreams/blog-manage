# blog-manage

一个基于 Vue 3 + Vite + TypeScript 的博客后台管理系统，用于管理文章/随记/评论/留言/分类标签/图库等内容，并提供数据概览与访问记录查看。

## 项目组成

- 前台：`https://github.com/corndreams/blog-frontend`
- 管理端（当前仓库）：`https://github.com/corndreams/blog-manage`
- 后端服务端：`https://github.com/corndreams/blog-server`

## 技术栈

- Vue 3、Vue Router
- Pinia
- Element Plus（含 @element-plus/icons-vue）
- WangEditor（富文本编辑）
- ECharts（数据可视化）
- Axios
- Vite、TypeScript

## 功能概览

- 登录鉴权：登录成功后将 token 存入 localStorage，并在请求头以 `token` 字段携带
- 数据概览：仪表盘展示核心数据（访问量/内容数量等）
- 文章管理：列表、创建/编辑（富文本）、发布/草稿等状态
- 随记管理：列表、创建/编辑、发布/隐藏等状态
- 评论/留言管理：列表、审核/删除（以接口实现为准）
- 分类/标签管理：增删改查
- 个人信息：资料编辑（头像/签名/简介等）
- 友情链接：增删改查
- 图库：上传与素材列表（配合后端 `/files` 接口）
- 访问记录：按时间筛选分页查看访问明细（设备/UA/IP 等）

## 最近更新

- 优化登录态初始化：应用挂载前恢复本地 token，避免刷新后首批请求未携带鉴权信息。
- 增加 401 处理：接口返回未授权时自动清理登录状态并跳转登录页。
- 增加左侧侧边栏收缩/展开，提升后台在宽内容页面下的可用空间。
- 升级管理端 UI 风格：与晚风漫记前台相似的玻璃拟态、暖纸色、柔和卡片和低饱和青绿色体系。
- 优化表格、分页、图库占位和富文本编辑器样式，减少白色闪烁并提升暗色背景下的可读性。

## 本地运行

### 环境要求

- Node：`^20.19.0 || >=22.12.0`
- 包管理器：pnpm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务

```bash
pnpm dev
```

### 构建与预览

```bash
pnpm build
pnpm preview
```

### 类型检查

```bash
pnpm type-check
```

## 后端地址配置

当前请求基地址在 [http.ts](/src/api/http.ts) 中配置（`baseURL`）。如需切换到本地后端，修改为你的后端地址，例如：

```ts
baseURL: 'http://localhost:3000'
```

## 登录账号

后端启动时会自动初始化数据库并创建默认管理员账号（若数据库中还不存在用户）。默认账号信息在 [db.js](/models/db.js) 中配置：

## 目录结构

```text
src/
  api/            接口封装（articles/comments/diary/files/...）
  assets/         静态资源与全局样式
  components/     组件（登录表单、布局组件等）
  layouts/        页面布局（AdminLayout/AuthLayout）
  router/         路由与鉴权守卫
  stores/         Pinia 状态（auth/articles/comments/...）
  views/          页面（Dashboard/文章/随记/分类标签/访问记录等）
  main.ts         入口
  App.vue         根组件
```
```

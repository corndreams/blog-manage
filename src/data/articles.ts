/*
  开发初期的模拟数据
*/

export type ArticleStatus = '已发布' | '草稿' | '待审核'

export interface ArticleItem {
  id: number
  title: string
  category: string
  status: ArticleStatus
  views: number
  publishedAt?: string
  tags: string[]
  author: string
  content?: string
}

export const articles: ArticleItem[] = [
  { id: 1, title: 'json-server快速上手', category: '工具', status: '已发布', views: 2029, publishedAt: '2025-01-24', tags: ['mock'], author: 'conrdreams', content: '<p>json-server 是一个用于快速搭建 REST API 的工具。</p>' },
  { id: 2, title: 'Vue3中实现下载文件并txt、docx内容加密', category: '前端', status: '草稿', views: 1568, tags: ['vue'], author: 'conrdreams' },
  { id: 3, title: '校园活动管理平台——前端项目实战', category: '项目', status: '已发布', views: 2543, publishedAt: '2025-02-10', tags: ['项目'], author: 'conrdreams' },
  { id: 4, title: '接口鉴权与统一 API 文档', category: '后端', status: '已发布', views: 2229, publishedAt: '2025-02-19', tags: ['鉴权'], author: 'conrdreams' },
  { id: 5, title: '博客框架选型（Hexo、Typecho、Halo、WordPress）', category: '建站', status: '已发布', views: 1650, publishedAt: '2025-01-25', tags: ['建站'], author: 'conrdreams' },
  { id: 6, title: 'GitHub个人主页美化教程', category: '工具', status: '草稿', views: 2369, tags: ['github'], author: 'conrdreams' },
  { id: 7, title: '一图生成你的GitHub年度报告', category: '工具', status: '已发布', views: 1532, publishedAt: '2025-01-25', tags: ['报告'], author: 'conrdreams' },
  { id: 8, title: 'Hexo博客如何添加RSS订阅', category: 'hexo', status: '已发布', views: 1544, publishedAt: '2025-01-16', tags: ['hexo'], author: 'conrdreams' },
  { id: 9, title: '使用 clash 科学上网', category: '工具', status: '待审核', views: 2554, tags: ['网络'], author: 'conrdreams' },
  { id: 10, title: 'Follow 新一期互联网好课', category: '软件', status: '已发布', views: 2554, publishedAt: '2025-01-14', tags: ['课程'], author: 'conrdreams' },
  { id: 11, title: 'Hexo精进', category: 'hexo', status: '已发布', views: 2329, publishedAt: '2025-01-24', tags: ['hexo'], author: 'conrdreams' },
  { id: 12, title: 'VueConf24 总结', category: '前端', status: '草稿', views: 913, tags: ['vue'], author: 'conrdreams' },
  { id: 13, title: '收藏：高质量前端博客', category: '收藏', status: '已发布', views: 1499, publishedAt: '2024-12-08', tags: ['收藏'], author: 'conrdreams' },
  { id: 14, title: '正则表达式进阶指引', category: '工具', status: '已发布', views: 2466, publishedAt: '2024-12-15', tags: ['正则'], author: 'conrdreams' },
]
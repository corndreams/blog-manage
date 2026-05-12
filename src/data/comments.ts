// export type CommentStatus = '待审核' | '已通过' | '已拒绝'

// export interface CommentItem {
//   id: number
//   articleId: number
//   articleTitle: string
//   user: string
//   content: string
//   likes: number
//   createdAt: string
//   status: CommentStatus
// }

// export const commentsSeed: CommentItem[] = [
//   { id: 1, articleId: 1, articleTitle: 'json-server快速上手', user: 'Alice', content: '写得很清晰，受用！', likes: 12, createdAt: '2025-01-24 14:51', status: '已通过' },
//   { id: 2, articleId: 2, articleTitle: 'Vue3 下载与加密', user: 'Bob', content: '示例能否开源？', likes: 3, createdAt: '2025-04-07 17:33', status: '待审核' },
//   { id: 3, articleId: 3, articleTitle: '校园活动管理平台', user: 'Chris', content: '后端接口文档在哪里？', likes: 5, createdAt: '2025-02-19 11:08', status: '已通过' },
//   { id: 4, articleId: 4, articleTitle: '接口鉴权与统一 API 文档', user: 'David', content: 'JWT 有过期刷新吗？', likes: 1, createdAt: '2025-02-19 11:07', status: '已拒绝' },
//   { id: 5, articleId: 5, articleTitle: '博客框架选型', user: 'Eve', content: '推荐 Hexo + Vercel！', likes: 9, createdAt: '2025-01-25 09:27', status: '已通过' },
// ]
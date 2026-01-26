export type MessageStatus = '待审核' | '已通过' | '已拒绝'

export interface MessageItem {
  id: number
  user: string
  content: string
  likes: number
  createdAt: string
  status: MessageStatus
}

export const messagesSeed: MessageItem[] = [
  { id: 1, user: 'Alice', content: '网站很棒！继续加油～', likes: 10, createdAt: '2025-01-24 14:51', status: '已通过' },
  { id: 2, user: 'Bob', content: '能否分享项目源码地址？', likes: 2, createdAt: '2025-04-07 17:33', status: '待审核' },
  { id: 3, user: 'Chris', content: '后台界面很清爽，喜欢这种风格。', likes: 5, createdAt: '2025-02-19 11:08', status: '已通过' },
  { id: 4, user: 'David', content: '文档有些地方看不懂，希望补充说明。', likes: 1, createdAt: '2025-02-19 11:07', status: '已拒绝' },
]
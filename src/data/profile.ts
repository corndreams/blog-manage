export type MbtiType = 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

export interface GoalItem { id: number; text: string; done: boolean }

export interface Profile {
  avatar: string
  name: string
  tagline: string
  mbti: MbtiType
  mbtiDesc: string
  bio: string
  goals: GoalItem[]
  links: { gitee: string; github: string; bilibili: string }
  updatedAt?: string
}

export const mbtiOptions: { value: MbtiType; label: string; desc: string }[] = [
  { value: 'INTJ', label: 'INTJ', desc: '战略家，独立且理性' },
  { value: 'INTP', label: 'INTP', desc: '逻辑学家，热爱探索' },
  { value: 'ENTJ', label: 'ENTJ', desc: '指挥官，善于组织' },
  { value: 'ENTP', label: 'ENTP', desc: '辩论家，创意丰富' },
  { value: 'INFJ', label: 'INFJ', desc: '提倡者，富有洞察' },
  { value: 'INFP', label: 'INFP', desc: '调停者，理想主义' },
  { value: 'ENFJ', label: 'ENFJ', desc: '主人公，激励他人' },
  { value: 'ENFP', label: 'ENFP', desc: '竞选者，热情外向' },
  { value: 'ISTJ', label: 'ISTJ', desc: '物流师，务实可靠' },
  { value: 'ISFJ', label: 'ISFJ', desc: '守护者，细致体贴' },
  { value: 'ESTJ', label: 'ESTJ', desc: '总经理，组织能力强' },
  { value: 'ESFJ', label: 'ESFJ', desc: '执政官，社交能手' },
  { value: 'ISTP', label: 'ISTP', desc: '鉴赏家，动手能力强' },
  { value: 'ISFP', label: 'ISFP', desc: '探险家，感受生活' },
  { value: 'ESTP', label: 'ESTP', desc: '企业家，行动派' },
  { value: 'ESFP', label: 'ESFP', desc: '表演者，乐观活力' },
]

export const defaultProfile: Profile = {
  avatar: 'http://localhost:3000/uploads/1763212869002_tro6q6d7kd.jpeg',
  name: 'Conrdreams',
  tagline: '代码改变生活',
  mbti: 'ISFP',
  mbtiDesc: '探险家，感受生活',
  bio: '这里是个人介绍。热爱技术与分享，专注工程效率与产品体验。',
  goals: [
    { id: 1, text: '发布 12 篇高质量技术文章', done: false },
    { id: 2, text: '完成一个开源项目的里程碑', done: false },
  ],
  links: {
    gitee: 'https://gitee.com/yourname',
    github: 'https://github.com/yourname',
    bilibili: 'https://space.bilibili.com/yourid',
  },
}
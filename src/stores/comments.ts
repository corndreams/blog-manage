import { defineStore } from 'pinia'
import { getComments, deleteComment, type GetCommentsParams, type CommentItemResp } from '@/api/comments'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    list: [] as CommentItemResp[],
    total: 0,
    page: 1,
    pageSize: 10,
    articleId: undefined as number | undefined,
    loading: false,
    error: '',
  }),
  actions: {
    async fetch(params?: Partial<GetCommentsParams>) {
      this.loading = true
      this.error = ''
      const query: GetCommentsParams = {
        page: params?.page ?? this.page,
        pageSize: params?.pageSize ?? this.pageSize,
        article_id: params?.article_id ?? this.articleId,
      }
      try {
        const data = await getComments(query)
        this.list = data.data.list
        this.total = data.data.total
        this.page = data.data.page
        this.pageSize = data.data.pageSize
        this.articleId = query.article_id
      } catch (e: any) {
        this.error = e?.message || '获取评论失败'
      } finally {
        this.loading = false
      }
    },
    async remove(id: number) {
      await deleteComment(id)
      await this.fetch({ page: this.page })
    },
    async bulkRemove(ids: number[]) {
      for (const id of ids) {
        try { await deleteComment(id) } catch {}
      }
      await this.fetch({ page: this.page })
    },
    setPage(p: number) { this.page = p },
    setArticleId(id?: number) { this.articleId = id },
  }
})
import { defineStore } from "pinia";
import {
  getLinks,
  postLinkEdit,
  deleteLink,
  type LinkItem,
  type LinkEditPayload,
} from "@/api/links";

export const useLinksStore = defineStore("links", {
  state: () => ({
    list: [] as LinkItem[],
    loading: false,
    error: "",
    editing: null as LinkItem | null,
  }),
  actions: {
    async fetch() {
      this.loading = true;
      this.error = "";
      try {
        const resp = await getLinks();
        this.list = resp.data;
      } catch (e: any) {
        this.error = e?.message || "获取个人链接失败";
      } finally {
        this.loading = false;
      }
    },
    async save(payload: LinkEditPayload) {
      await postLinkEdit(payload);
      await this.fetch();
    },
    async remove(id: number) {
      await deleteLink(id);
      await this.fetch();
    },
    setEditing(item: LinkItem | null) {
      this.editing = item;
    },
  },
});

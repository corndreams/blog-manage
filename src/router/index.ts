import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
      meta: { public: true, title: "登录" },
    },
    {
      path: "/",
      component: AdminLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("@/views/Dashboard.vue"),
          meta: { title: "首页", icon: "House" },
        },
        {
          path: "articles",
          name: "Articles",
          component: () => import("@/views/ArticlesServer.vue"),
          meta: { title: "文章管理", icon: "Document" },
        },
        {
          path: "articles/edit/:id?",
          name: "ArticleEdit",
          component: () => import("@/views/ArticleEdit.vue"),
          meta: { title: "文章编辑", icon: "Edit" },
        },
        {
          path: "comments",
          name: "Comments",
          component: () => import("@/views/Comments.vue"),
          meta: { title: "评论管理", icon: "ChatDotRound" },
        },
        {
          path: "messages",
          name: "Messages",
          component: () => import("@/views/Messages.vue"),
          meta: { title: "留言管理", icon: "Message" },
        },
        {
          path: "links",
          name: "Links",
          component: () => import("@/views/Links.vue"),
          meta: { title: "个人链接", icon: "Link" },
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import("@/views/Profile.vue"),
          meta: { title: "个人信息", icon: "User" },
        },
        {
          path: "taxonomy",
          name: "Taxonomy",
          component: () => import("@/views/Taxonomy.vue"),
          meta: { title: "分类/标签管理", icon: "Collection" },
        },
        {
          path: "diary",
          name: "Diary",
          component: () => import("@/views/DiaryList.vue"),
          meta: { title: "随记管理", icon: "Edit" },
        },
        {
          path: "visits",
          name: "Visits",
          component: () => import("@/views/Visits.vue"),
          meta: { title: "访问记录", icon: "View" },
        },
        {
          path: "gallery",
          name: "Gallery",
          component: () => import("@/views/Gallery.vue"),
          meta: { title: "图库", icon: "Picture" },
        },
        {
          path: "diary/edit/:id?",
          name: "DiaryEdit",
          component: () => import("@/views/DiaryEdit.vue"),
          meta: { title: "随记编辑", icon: "Edit" },
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (!to.meta.public && !auth.isAuthed) return { path: "/login" };
});

export default router;

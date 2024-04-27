import { users } from "@/router/enums";

export default [
  {
    path: "/users",
    redirect: "/users/",
    meta: {
      icon: "ri:information-line",
      // showLink: false,
      title: "用户管理",
      rank: users
    },
    children: [
      {
        path: "/users/",
        name: "users",
        component: () => import("@/views/user/list/index.vue"),
        meta: {
          title: "用户管理"
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;

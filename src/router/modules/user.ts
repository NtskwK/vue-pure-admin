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
      },
      {
        path: "/users/detail/:id",
        name: "userDetail",
        component: () => import("@/views/user/detail/index.vue"),
        meta: {
          title: "用户详情",
          showLink: false,
          showParent: true
        }
      },
      {
        path: "/users/create",
        name: "usersCreate",
        component: () => import("@/views/user/register/index.vue"),
        meta: {
          title: "创建用户",
          showLink: false,
          showParent: true
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;

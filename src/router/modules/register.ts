export default [
  {
    path: "/register",
    redirect: "/register/",
    meta: {
      // icon: "ri:information-line",
      showLink: false,
      title: "用户注册"
      // rank: error
    },
    children: [
      {
        path: "/register/",
        name: "register",
        component: () => import("@/views/user/register/index.vue"),
        meta: {
          title: "用户注册"
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;

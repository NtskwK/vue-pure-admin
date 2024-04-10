// 根据角色动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "users/create/",
    method: "post",
    response: ({ body }) => {
      if (body.username !== null && body.username !== undefined && body.username !== "" 
        && body.password !== null && body.password !== undefined && body.password !== ""
        && body.email !== null && body.email !== undefined && body.email !== "") {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (emailRegex.test(body.email)) {
          return {
            Response: {
              code: 201,
            }
          };
        } else {
          return {
            Response: {
              code: 400,
              message: "邮箱格式不正确"
            }
          };
        }
      } else {
        return {
            message: "字段不能为空"
        };
      }
    }
  }
]);

import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    access: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refresh: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    access: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refresh: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<any>("post", baseUrlApi("login/"), { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>(
    "post",
    baseUrlApi("/login/refresh/"),
    { data }
  );
};

// 获取当前用户信息
export const getUserInfo = (data?: object) => {
  return http.request<UserResult>("get", baseUrlApi("info/"), { data });
};

export const registerUserApi = (data?: object) => {
  return http.request<any>("post", baseUrlApi("users/create/"), { data });
};

export const getUserList = (data?: object) => {
  return http.request<UserResult>("get", baseUrlApi("users/"), { data });
};

export const updateUser = (userId: Number, data: object) => {
  return http.request<UserResult>("post", baseUrlApi("users/" + userId + "/"), {
    data
  });
};

export const deleteUser = (data?: object) => {
  return http.request<UserResult>("get", baseUrlApi("info/"), { data });
};

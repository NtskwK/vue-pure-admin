import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
// import { DataInfo } from "@/utils/auth";

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
  return http.request<any>("post", baseUrlApi("token-auth/"), { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", baseUrlApi("token-auth/"), {
    data
  });
};

// 获取当前用户信息
export const getUserInfo = (data?: object) => {
  return http.request<UserResult>("get", baseUrlApi("admin/users/info"), {
    data
  });
};

export const registerUserApi = (data?: object) => {
  return http.request<any>("post", baseUrlApi("users/create/"), { data });
};

export const getUserList = (params?: object) => {
  console.log(params);

  return http.request<any>("get", baseUrlApi("users/"), { params });
};

export const updateUser = (userId: Number, data: object) => {
  return http.request<UserResult>("post", baseUrlApi("users/" + userId + "/"), {
    data
  });
};

export const deleteUser = (params?: object) => {
  return http.request<any>("get", baseUrlApi("users/"), { params });
};

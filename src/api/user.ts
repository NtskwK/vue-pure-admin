import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type UserRolesResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username?: string;
    /** 当前登陆用户的角色 */
    roles?: Array<string>;
    /** `token` */
    access: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refresh: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
    /** CSRF token */
    csrftoken?: string;
  };
};

export type UserDetailResult = {
  id: number;
  last_login: Date;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  groups: string[];
  user_permissions: string[];
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

export type GetTokenResult = {
  token: string;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<GetTokenResult>("post", baseUrlApi("token-auth/"), {
    data
  });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", baseUrlApi("auth/login/"), {
    data
  });
};

// 获取当前用户信息
export const getUserRoles = (data: { access: string }) => {
  return http.request<UserRolesResult>("get", baseUrlApi("users/info/"), {
    data
  });
};

export const createUser = (data?: object) => {
  return http.request<any>("post", baseUrlApi("users/create/"), { data });
};

export const retrieveUser = (userId: Number) => {
  return http.request<UserDetailResult>(
    "get",
    baseUrlApi("admin/users/" + userId + "/")
  );
};

export const getUserList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("admin/users/"), { params });
};

export const updateUser = (userId: Number, data: object) => {
  return http.request<UserDetailResult>(
    "patch",
    baseUrlApi("admin/users/" + userId + "/"),
    {
      data
    }
  );
};

export const deleteUser = (userId: Number) => {
  return http.request<any>("delete", baseUrlApi("users/" + userId + "/"));
};

import { defineStore } from "pinia";
import { store } from "@/store";
import type { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { resetRouter, router } from "@/router";
import { storageLocal } from "@pureadmin/utils";
import type { RefreshTokenResult, UserRolesResult } from "@/api/user";
import { getLogin, getUserRoles, refreshTokenApi } from "@/api/user";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { type DataInfo, removeToken, setToken, userKey } from "@/utils/auth";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 前端生成的验证码（按实际需求替换）
    verifyCode: "",
    // 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
    currentPage: 0,
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储前端生成的验证码 */
    SET_VERIFYCODE(verifyCode: string) {
      this.verifyCode = verifyCode;
    },
    /** 存储登录页面显示哪个组件 */
    SET_CURRENTPAGE(value: number) {
      this.currentPage = value;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserRolesResult>((resolve, reject) => {
        getLogin(data)
          .then(loginData => {
            const tokenData: DataInfo<Date> = {
              access: loginData.token,
              refresh: loginData.token,
              expires: new Date(Date.now() + 3600 * 10000)
            };
            setToken(tokenData);
            getUserRoles({ access: loginData.token })
              .then(info => {
                if (info) {
                  const userInfo: UserRolesResult = {
                    success: true,
                    data: {
                      username: info.data.username,
                      roles: info.data.roles,
                      csrftoken: info.data.csrftoken,
                      access: loginData.token,
                      refresh: loginData.token,
                      expires: new Date(Date.now() + 3600 * 10000)
                    }
                  };
                  setToken(userInfo.data);
                  resolve({ success: true, data: userInfo.data });
                }
              })
              .catch(error => {
                reject(error);
              });
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data) {
              // setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}

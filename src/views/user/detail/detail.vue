<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { retrieveUser, updateUser } from "@/api/user";
import { message } from "@/utils/message";
import userDetailTemplateVue from "./userDetailTemplate.vue";

const route = useRoute();

const formTitle = ref("创建用户");
const submitButtonText = ref("创建");

defineOptions({
  name: "Detail"
});

const getUserDataDetail = id => {
  return new Promise((resolve, reject) => {
    retrieveUser(id)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

const onSubmit = data => {
  updateUser(Number(route.params.id), data)
    .then(res => {
      message("用户" + res.username + "修改成功", { type: "success" });
      router.push({ path: "/users/" });
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};
</script>

<template>
  <userDetailTemplateVue
    :submit-button-text="submitButtonText"
    :form-title="formTitle"
    :submit-handler="onSubmit"
    :fetchData="getUserDataDetail"
  />
</template>

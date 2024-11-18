<script setup lang="ts">
import { reactive } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { retrieveUser, updateUser } from "@/api/user";
import { message } from "@/utils/message";

const route = useRoute();

const form = reactive({
  username: "",
  email: "",
  is_superuser: false,
  is_staff: false,
  firstname: "",
  lastname: "",
  is_activate: false
  // groups: [],
});

defineOptions({
  name: "Detail"
});

onMounted(() => {
  const id = Number(route.params.id);
  console.log(id);
  if (!id) router.push("/users/");
  retrieveUser(id)
    .then(res => {
      console.log(res);
      const formData = res;
      form.username = formData.username;
      form.email = formData.email;
      form.is_superuser = formData.is_superuser;
      form.is_staff = formData.is_staff;
      form.firstname = formData.first_name;
      form.lastname = formData.last_name;
      form.is_activate = formData.is_active;
      // form.groups = formData.groups;
    })
    .catch(err => {
      console.error(err);
      if (err.response.status == 404) {
        router.push("/error/404");
      }
    });
});

const onSubmit = () => {
  updateUser(Number(route.params.id), form)
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
  <el-card shadow="never">
    <div style="margin: 30px; font-size: 20px">用户详情</div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="是否是超级用户">
        <el-switch v-model="form.is_superuser" />
      </el-form-item>
      <el-form-item label="是否是管理员">
        <el-switch v-model="form.is_staff" />
      </el-form-item>
      <el-form-item label="姓">
        <el-input v-model="form.firstname" />
      </el-form-item>
      <el-form-item label="名">
        <el-input v-model="form.lastname" />
      </el-form-item>
      <el-form-item label="是否激活">
        <el-switch v-model="form.is_activate" />
      </el-form-item>
      <div style="display: flex; justify-content: center">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="router.back()">Cancel</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

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

const props = defineProps({
  submitButtonText: {
    type: String
  },
  formTitle: {
    type: String
  },
  submitHandler: {
    type: Function
  },
  fetchData: {
    type: Function,
    default: null
  }
});

defineOptions({
  name: "Detail"
});

onMounted(() => {
  const id = Number(route.params.id);
  if (id) {
    props.fetchData(id).then(res => {
      form.username = res.username;
      form.email = res.email;
      form.is_superuser = res.is_superuser;
      form.is_staff = res.is_staff;
      form.firstname = res.first_name;
      form.lastname = res.last_name;
      form.is_activate = res.is_active;
      // form.groups = res.groups;
    });
  }
});

const onSubmit = () => {
  props.submitHandler(form);
};

const goBack = () => {
  router.push({ path: "/users/" });
};
</script>

<template>
  <el-card shadow="never">
    <div style="margin: 30px; font-size: 20px">{{ props.formTitle }}</div>
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
          <el-button @click="goBack">Cancel</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import table from "./table/index.vue";

defineOptions({
  name: "UserList"
});
</script>

<template>
  <el-card shadow="never">
    <div>用户列表</div>
    <component :is="table" />
  </el-card>
</template>

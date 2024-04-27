<script setup lang="ts">
import { useColumns } from "./columns";

const {
  loading,
  columns,
  dataList,
  pagination,
  tableSize,
  loadingConfig,
  onCurrentChange
} = useColumns();
</script>

<template>
  <pure-table
    border
    :columns="columns"
    :loading="loading"
    :loading-config="loadingConfig"
    :pagination="pagination"
    :data="
      dataList.slice(
        (pagination.currentPage - 1) * pagination.pageSize,
        pagination.currentPage * pagination.pageSize
      )
    "
    :size="tableSize as any"
    stripe
    @page-current-change="onCurrentChange"
  />
</template>

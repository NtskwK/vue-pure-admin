import { message } from "@/utils/message";
import { tableData } from "./data";
import { clone, delay } from "@pureadmin/utils";
import { ref, onMounted, reactive } from "vue";
import type { PaginationProps, LoadingConfig } from "@pureadmin/table";

// 如果您不习惯tsx写法，可以传slot，然后在template里写
// 需是hooks写法（函数中有return），避免失去响应性
export function useColumns() {
  const dataList = ref([]);
  const loading = ref(true);
  const tableSize = ref("default");
  const columns: TableColumnList = [
    {
      label: "日期",
      prop: "date",
      cellRenderer: ({ row }) => (
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{row.date}</span>
        </div>
      )
    },
    {
      label: "姓名",
      prop: "name"
    },
    {
      label: "地址",
      prop: "address"
    },
    {
      label: "操作",
      cellRenderer: ({ index, row }) => (
        <>
          <el-button size="small" onClick={() => handleEdit(index + 1, row)}>
            Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            onClick={() => handleDelete(index + 1, row)}
          >
            Delete
          </el-button>
        </>
      )
    }
  ];

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    layout: "total, prev, pager, next, jumper",
    pageSize: 10,
    currentPage: 1,
    total: 0,
    align: "right",
    background: true,
    small: false
  });

  /** 加载动画配置 */
  const loadingConfig = reactive<LoadingConfig>({
    text: "正在加载数据...",
    viewBox: "-10, -10, 50, 50",
    spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    // svg: "",
    // background: rgba()
  });

  function onCurrentChange(val) {
    loadingConfig.text = `正在加载第${val}页...`;
    loading.value = true;
    delay(600).then(() => {
      loading.value = false;
    });
  }

  onMounted(() => {
    delay(600).then(() => {
      const newList = [];
      Array.from({ length: 6 }).forEach(() => {
        newList.push(clone(tableData, true));
      });
      newList.flat(Infinity).forEach((item, index) => {
        dataList.value.push({ id: index, ...item });
      });
      pagination.total = dataList.value.length;
      loading.value = false;
    });
  });

  const handleEdit = (index: number, row) => {
    message(`第${row}行数据更新成功`, {
      type: "success"
    });
  };

  const handleDelete = (index: number, row) => {
    message(`第${row}行数据删除成功`);
  };

  return {
    loading,
    columns,
    dataList,
    tableData,
    tableSize,
    loadingConfig,
    pagination,
    onCurrentChange
  };
}

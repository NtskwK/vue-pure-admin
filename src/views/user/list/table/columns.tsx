import { message } from "@/utils/message";
import { delay } from "@pureadmin/utils";
import { ref, onMounted, reactive } from "vue";
import type { PaginationProps, LoadingConfig } from "@pureadmin/table";
import { getUserList } from "@/api/user";
import router from "@/router";

// 如果您不习惯tsx写法，可以传slot，然后在template里写
// 需是hooks写法（函数中有return），避免失去响应性
export function useColumns() {
  const loading = ref(true);
  const tableSize = ref("default");
  const columns: TableColumnList = [
    {
      label: "id",
      prop: "id"
    },
    {
      label: "用户名",
      prop: "username"
    },
    {
      label: "邮箱",
      prop: "email"
    },
    {
      label: "上次登录时间",
      prop: "last_login",
      cellRenderer: ({ row }) => (
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{row.date}</span>
        </div>
      )
    },
    {
      label: "操作",
      // cellRenderer: ({ index, row }) => (
      cellRenderer: ({ row }) => (
        <>
          <el-button size="small" onClick={() => handleEdit(row)}>
            Edit
          </el-button>
          {/*<el-button*/}
          {/*  size="small"*/}
          {/*  type="danger"*/}
          {/*  onClick={() => handleDelete(index + 1, row)}*/}
          {/*>*/}
          {/*  Delete*/}
          {/*</el-button>*/}
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

  const userList = ref([]);
  onMounted(() => {
    getUserList()
      .then(res => {
        console.log(res.results);
        res.results.flat(Infinity).forEach((item, index) => {
          userList.value.push({ id: index, ...item });
        });
        pagination.total = userList.value.length;
      })
      .catch(err => {
        message(err.message, { type: "error" });
        throw err;
      })
      .finally(() => {
        loading.value = false;
      });
  });

  const handleEdit = row => {
    console.log(row.id);
    router.push({ name: "userDetail", params: { id: row.id } });
    // message(`第${row}行数据更新成功`, {
    //   type: "success"
    // });
  };

  // const handleDelete = (index: number, row) => {
  //
  //   message(`第${row}行数据删除成功`,
  //     {
  //       type: "warning"
  //     });
  // };

  return {
    loading,
    columns,
    userList,
    tableSize,
    loadingConfig,
    pagination,
    onCurrentChange
  };
}

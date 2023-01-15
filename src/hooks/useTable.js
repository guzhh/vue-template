import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

/**
 * table table公共方法
 * @param requestMethod 表格数据请求方法
 * @param formData 请求参数
 * @param LoadData 初始化是否加载数据
 * @param defaultPageSize 处理数据
 * @param processTheData 处理数据
 * @returns {{resetTableList: resetTableList, onChange: onChange, tableList: Ref<UnwrapRef<*[]>>, reset: reset, page: UnwrapNestedRefs<{totalResult: number, pageSizes: number[], pageSize: number, currentPage: number}>, tableLoading: Ref<UnwrapRef<boolean>>, searchForm: Ref<UnwrapRef<{}>>, getTableData: getTableData, onUpdatePageSize: onUpdatePageSize}}
 */
// eslint-disable-next-line func-names
export default function ({ requestMethod, formData = {}, LoadData = true, defaultPageSize = 20, processTheData, initDataCallBack = () => {} }) {
  const tableList = ref([]);
  const tableLoading = ref(false);
  const searchForm = ref({ ...formData });
  const page = reactive({
    currentPage: 1,
    pageSize: defaultPageSize,
    totalResult: 0,
    pageSizes: [5, 10, 15, 20, 50, 100, 200, 300, 500, 1000]
  });

  /**
   * 加载表格数据
   */
  const getTableData = () => {
    tableLoading.value = true;
    const params = { pageNo: page.currentPage, pageSize: page.pageSize, ...searchForm.value };
    requestMethod(params)
      .then((res) => {
        if (res.success) {
          // console.log('res', res)
          if (processTheData) {
            tableList.value = processTheData(res.result.data);
          } else {
            tableList.value = res.result.data;
          }
          page.totalResult = res.result.totalCount;
          // 当请求的不是第一页并且没有返回数据就重新加载第一页数据
          if (page.currentPage > 1 && (!res.result.data || res.result.data.length <= 0)) {
            page.currentPage = 1;
            getTableData();
          }
          initDataCallBack();
        } else {
          ElMessage.error(res.message);
        }
      })
      .finally(() => {
        tableLoading.value = false;
        // 对接项目后，将代码删除
        // tableList.value = [{}]
      });
  };

  const onChange = (pageNo) => {
    page.currentPage = pageNo;
    getTableData();
  };
  const onUpdatePageSize = (pageSize) => {
    page.pageSize = pageSize;
    page.currentPage = 1;
    getTableData();
  };

  /**
   * 重置表格数据
   */
  const resetTableList = () => {
    page.currentPage = 1;
    getTableData();
  };

  /**
   * 重置表格搜索框
   */
  const reset = () => {
    searchForm.value = { ...formData };
    resetTableList();
  };

  if (LoadData) {
    getTableData();
  }

  return {
    tableList,
    tableLoading,
    searchForm,
    getTableData,
    onChange,
    onUpdatePageSize,
    resetTableList,
    page,
    reset
  };
}

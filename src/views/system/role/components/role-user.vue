<!--
  文件描述：
  创建时间：2024/1/15 9:16
  创建人：gzh
-->
<template>
	<base-modal style="width: 900px" title="科室下用户" v-model:show="visible" @close="handleClose" :footer="null">
		<vxe-table
			:data="tableList"
			max-height="800"
			:loading="tableLoading"
			size="mini"
			align="center"
			border="none"
			resizable
			stripe
			row-id="id"
			show-header-overflow="title"
			show-overflow
		>
			<vxe-column field="name" min-width="100" show-overflow="title" title="姓名"></vxe-column>
			<vxe-column field="piny" min-width="100" show-overflow="title" title="拼音码"></vxe-column>
			<vxe-column field="account" min-width="100" show-overflow="title" title="账号"></vxe-column>
			<vxe-column field="phone" min-width="100px" show-overflow="title" title="手机号"></vxe-column>
			<vxe-column field="email" min-width="100px" show-overflow="title" title="邮箱"></vxe-column>
			<vxe-column field="userType" min-width="100px" show-overflow="title" title="用户类型">
				<template #default="{ row }">
					<dict-show :dictCode="row.userType"></dict-show>
				</template>
			</vxe-column>
			<vxe-column field="state" min-width="80px" show-overflow="title" title="状态">
				<template #default="{ row }">
					<option-badge :options="stateJudgeOption" :val="row.state" />
				</template>
			</vxe-column>
			<vxe-column field="sortNum" min-width="100px" show-overflow="title" title="排序号"></vxe-column>
		</vxe-table>
		<n-pagination
			v-model:page="page.currentPage"
			v-model:page-size="page.pageSize"
			:item-count="page.totalResult"
			:page-sizes="page.pageSizes"
			show-quick-jumper
			show-size-picker
			style="display: flex; justify-content: right; margin-top: 5px"
			@update:page="onChange"
			@update:page-size="onUpdatePageSize"
		>
			<template #suffix> 共 {{ page.totalResult }} 条数据</template>
		</n-pagination>
	</base-modal>
</template>

<script setup>
import useTableData from "@/hooks/useTableData";
import { getUserByRole } from "@/api/system/role";
import { stateJudgeOption } from "@/constant/system/resource";

defineOptions({ name: "deptUsers" });
const visible = ref(false);

const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, resetTableList } = useTableData({
	requestMethod: getUserByRole,
	LoadData: false,
	formData: { roleId: null }
});

const handleClose = () => {
	visible.value = false;
	searchForm.value = { roleId: null };
};

const open = row => {
	visible.value = true;
	searchForm.value.roleId = row.id;
	resetTableList(row);
};

defineExpose({ open });
</script>

<style scoped></style>

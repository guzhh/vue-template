<template>
	<page-content>
		<n-card size="small" title="参数列表">
			<template #header>
				<n-input
					size="small"
					style="width: 200px"
					v-model:value="searchForm.query"
					placeholder="参数编码/参数名称"
					@keydown.enter.prevent="resetTableList"
				/>
				<n-button size="small" type="primary" @click="resetTableList" style="margin-left: 10px"> 查询</n-button>
				<n-button size="small" type="default" @click="reset" style="margin-left: 10px"> 重置</n-button>
			</template>
			<template #header-extra>
				<n-button size="small" style="margin-right: 10px" type="primary" @click="addParam">新增参数</n-button>
				<n-tooltip>
					<span>刷新</span>
					<template #trigger>
						<n-icon size="17" @click="resetTableList">
							<Refresh />
						</n-icon>
					</template>
				</n-tooltip>
				<n-divider vertical />
				<n-tooltip>
					<span>密度</span>
					<template #trigger>
						<n-popselect v-model:value="tableSize" :options="tableSizeOptions" trigger="click">
							<n-icon size="17">
								<AutoFitHeight20Filled />
							</n-icon>
						</n-popselect>
					</template>
				</n-tooltip>
				<n-divider vertical />
			</template>
			<vxe-table
				stripe
				:data="tableList"
				:height="height - 120"
				:loading="tableLoading"
				:size="tableSize"
				align="center"
				border="none"
				resizable
				row-id="id"
				show-header-overflow="title"
				show-overflow
				:row-config="{ isHover: true, isCurrent: true }"
			>
				<vxe-column field="id" show-overflow="title" title="ID" width="60px"></vxe-column>
				<vxe-column field="typeCode" min-width="100px" show-overflow="title" title="参数类型编码"></vxe-column>
				<vxe-column field="typeName" min-width="100px" show-overflow="title" title="参数类型名称"></vxe-column>
				<vxe-column field="paramConfig" min-width="200px" show-overflow="title" title="参数配置"></vxe-column>
				<vxe-column field="paramVal" min-width="100px" show-overflow="title" title="参数值"></vxe-column>
				<vxe-column field="paramDescr" min-width="100px" show-overflow="title" title="参数描述"></vxe-column>
				<vxe-column title="操作" width="150px">
					<template #default="{ row }">
						<n-button style="margin-right: 10px" text type="warning" @click="deployParam(row)">配置</n-button>
						<n-button style="margin-right: 10px" text type="primary" @click="editParam(row)"> 编辑</n-button>
						<n-popconfirm @positive-click="deleteParam(row)">
							<template #trigger>
								<n-button text type="error"> 删除</n-button>
							</template>
							确定要删除该参数吗？
						</n-popconfirm>
					</template>
				</vxe-column>
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
		</n-card>
		<create-from ref="paramFormRef" @ok="getTableData" />
		<deploy-param-form ref="deployParamFormRef" @ok="getTableData" />
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import useTable from "@/hooks/useTable";
import useTableData from "@/hooks/useTableData.js";
import { useWindowSize } from "@/hooks/useWindowSize";
import CreateFrom from "@/views/system/orgParams/components/create-from.vue";
import DeployParamForm from "./components/deploy-param-form.vue";
import { delOrgParam, getOrgParamList } from "@/api/system/orgParams";

defineOptions({ name: "paramList" });

const deployParamFormRef = ref();
const { tableSizeOptions, tableSize } = useTable();
const paramFormRef = ref();
const { height } = useWindowSize();
const formData = { query: "" };
// eslint-disable-next-line no-unused-vars
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, resetTableList, getTableData } = useTableData({
	requestMethod: getOrgParamList,
	formData
});

const reset = () => {
	searchForm.value.query = "";
	resetTableList();
};

// 新增参数
const addParam = () => {
	paramFormRef.value.add();
};

// 编辑参数
const editParam = row => {
	paramFormRef.value.edit(row);
};

// 配置参数
const deployParam = row => {
	deployParamFormRef.value.open(row);
};

// 删除参数
const deleteParam = row => {
	delOrgParam({ id: row.id }).then(res => {
		if (res.success) {
			getTableData();
		}
	});
};
</script>

<style lang="less" scoped>
.search-card {
	::v-deep(.n-form-item-feedback-wrapper) {
		display: none;
	}
}
</style>

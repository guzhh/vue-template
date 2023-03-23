<template>
	<page-content>
		<div id="sysSearchBox" style="position: relative">
			<n-card size="small" title="系统列表">
				<template #header-extra>
					<n-button size="small" type="primary" @click="add"> 新增系统</n-button>
					<n-divider vertical />
					<search-box :placement="'top'" :to="'#sysSearchBox'" @reset="reset" @search="resetTableList">
						<n-form ref="formRef" :label-width="100" :model="searchForm" inline label-placement="left">
							<n-form-item label="是否内部系统:" path="sysName">
								<n-select
									v-model:value="searchForm.ifInternal"
									:options="options"
									clearable
									style="width: 200px"
									@update:value="resetTableList"
								/>
							</n-form-item>
							<n-form-item label="系统名称:" path="sysName">
								<n-input
									v-model:value="searchForm.sysName"
									placeholder="请输入系统名称"
									@keydown.enter.prevent="resetTableList"
								/>
							</n-form-item>
							<n-form-item label="系统类型:" path="sysType">
								<n-select
									v-model:value="searchForm.sysType"
									:options="typeOptions"
									clearable
									style="width: 200px"
									@update:value="resetTableList"
								/>
							</n-form-item>
						</n-form>
					</search-box>
					<n-divider vertical />
					<n-tooltip>
						<span>刷新</span>
						<template #trigger>
							<n-icon size="17" @click="getTableData">
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
				</template>

				<vxe-table
					:data="tableList"
					:height="height - 110"
					:loading="tableLoading"
					:size="tableSize"
					align="center"
					border
					resizable
					show-header-overflow="title"
					show-overflow
				>
					<vxe-column field="id" show-overflow="title" title="id" width="50px"></vxe-column>
					<vxe-column field="sysName" min-width="100px" show-overflow="title" title="系统名称"></vxe-column>
					<vxe-column field="sysDescr" min-width="100px" show-overflow="title" title="系统描述"></vxe-column>
					<vxe-column field="sysIndexUrl" min-width="200px" show-overflow="title" title="系统首页地址"></vxe-column>
					<vxe-column field="ifInternal" min-width="100px" show-overflow="title" title="是否内部系统">
						<template #default="{ row }">
							<option-badge :options="ifcacheOptions" :val="row.ifInternal" />
						</template>
					</vxe-column>
					<vxe-column field="sysType" min-width="100px" show-overflow="title" title="系统类型">
						<template #default="{ row }">
							<span v-if="row.sysType === 1">B/S架构</span>
							<span v-else-if="row.sysType === 2">C/S架构</span>
						</template>
					</vxe-column>
					<vxe-column field="sysLogo" min-width="100px" show-overflow="title" title="系统logo">
						<template #default="{ row }">
							<div class="svg" style="width: 40px; height: 40px; margin: 0 auto" v-html="row.sysLogo"></div>
						</template>
					</vxe-column>
					<vxe-column field="showNum" min-width="100px" show-overflow="title" title="显示顺序"></vxe-column>
					<vxe-column field="ifDel" min-width="100px" show-overflow="title" title="是否删除">
						<template #default="{ row }">
							<option-badge :options="ifDeletedOption" :val="row.ifDel" />
						</template>
					</vxe-column>
					<vxe-column title="操作" width="150px">
						<template #default="{ row }">
							<n-button style="margin-right: 10px" text type="primary" @click="edit(row)"> 编辑</n-button>
							<n-popconfirm v-if="row.ifDel === 0" @positive-click="deleteSys(row)">
								<template #trigger>
									<n-button style="margin-right: 10px" text type="error"> 删除</n-button>
								</template>
								确定要删除该系统吗？
							</n-popconfirm>
							<n-popconfirm v-if="row.ifDel === 1" @positive-click="undoDele(row)">
								<template #trigger>
									<n-button text type="info"> 撤销删除</n-button>
								</template>
								确定要撤销删除吗？
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
			<create-form ref="createFormRef" @ok="resetTableList"></create-form>
		</div>
	</page-content>
</template>

<script setup>
import { useMessage, useThemeVars } from "naive-ui";
import useTableData from "@/hooks/useTableData.js";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getAuthSystemList, delSystem, cancelDelSystem } from "@/api/system/childSys";
import CreateForm from "@/views/system/childSys/components/create-form.vue";
import useTable from "@/hooks/useTable";
import { ifcacheOptions, ifDeletedOption } from "@/constant/system/resource";

defineOptions({ name: "childSys" });

const { tableSizeOptions, tableSize } = useTable();
const createFormRef = ref();
const themeVars = useThemeVars(); // 全局公共CSS变量
const message = useMessage();
const { height } = useWindowSize();
const formData = { ifInternal: undefined, sysName: "", sysType: undefined };
// eslint-disable-next-line no-unused-vars
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, resetTableList, getTableData } = useTableData({
	requestMethod: getAuthSystemList,
	formData
});
const options = ref([
	{
		label: "是",
		value: 1
	},
	{
		label: "否",
		value: 0
	}
]);
const typeOptions = ref([
	{
		label: "B/S架构",
		value: 1
	},
	{
		label: "C/S架构",
		value: 2
	}
]);

const add = () => {
	createFormRef.value.add();
};

const edit = row => {
	createFormRef.value.edit(row);
};

// 删除系统
const deleteSys = row => {
	delSystem({ id: row.id }).then(res => {
		if (res.success) {
			message.success("删除成功");
			resetTableList();
		}
	});
};

// 撤销删除
const undoDele = row => {
	cancelDelSystem({ id: row.id }).then(res => {
		if (res.success) {
			message.success("撤销成功");
			resetTableList();
		}
	});
};

const reset = () => {
	searchForm.value.sysName = "";
	searchForm.value.ifInternal = null;
	searchForm.value.sysType = null;
	resetTableList();
};
</script>

<style lang="less" scoped>
.search-card {
	::v-deep(.n-form-item-feedback-wrapper) {
		display: none;
	}
}

.svg {
	::v-deep(svg) {
		width: 100%;
		height: 100%;
	}

	::v-deep(svg) > path {
		fill: v-bind("themeVars.primaryColor") !important;
		transition: 0.5s;
	}
}
</style>

<template>
	<page-content>
		<div id="userSearchBox" style="position: relative">
			<n-card size="small" style="margin-left: 5px" title="列表">
				<template #header-extra>
					<n-button size="small" type="primary" @click="addData">新增</n-button>
					<n-divider vertical />
					<search-box :placement="'top'" :to="'#userSearchBox'" @reset="reset" @search="resetTableList">
						<n-form
							inline
							ref="formRef"
							label-width="100px"
							:model="searchForm"
							label-placement="left"
							require-mark-placement="left"
						>
							<n-grid cols="2 s:3 m:3 l:3 xl:4 2xl:5" responsive="screen">
								<n-grid-item> 搜索条件 </n-grid-item>
							</n-grid>
						</n-form>
					</search-box>
					<n-divider vertical />
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
					ref="tableRef"
					:data="tableList"
					:height="height - 125"
					:loading="tableLoading"
					:size="tableSize"
					align="center"
					border
					resizable
					row-id="code"
					show-header-overflow="title"
					show-overflow
				>
					&*****&
					<vxe-column fixed="right" title="操作" width="240px">
						<template #default="{ row }">
							<div class="dropDown">
								<n-button quaternary size="small" type="primary" @click="editData(row)">编辑 </n-button>
								<n-button quaternary size="small" type="error" @click="deleteData(row)"> 删除 </n-button>
							</div>
						</template>
					</vxe-column>
					<template #empty>
						<n-empty description="暂无数据"></n-empty>
					</template>
				</vxe-table>
				<n-pagination
					v-model:page="page.currentPage"
					v-model:page-size="page.pageSize"
					:item-count="page.totalResult"
					:page-sizes="page.pageSizes"
					show-quick-jumper
					show-size-picker
					style="margin-top: 5px; display: flex; justify-content: right"
					@update:page="onChange"
					@update:page-size="onUpdatePageSize"
				>
					<template #suffix> 共 {{ page.totalResult }} 条数据</template>
				</n-pagination>
			</n-card>
		</div>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import { useWindowSize } from "@/hooks/useWindowSize";
import useTable from "@/hooks/useTable";
import useTableData from "@/hooks/useTableData";

defineOptions({ name: "user" });

const tableRef = ref();
const { height } = useWindowSize();
const { tableSizeOptions, tableSize } = useTable();

// eslint-disable-next-line no-unused-vars
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, resetTableList, getTableData, reset } =
	useTableData({
		requestMethod: () => {},
		formData: {},
		LoadData: false
	});

// 新增数据
const addData = () => {
	console.log("----------", "新增数据");
};

// 编辑数据
const editData = row => {
	console.log("------------", row);
};

// 删除数据
const deleteData = row => {
	console.log("--------", row);
};
</script>

<style lang="scss" scoped></style>

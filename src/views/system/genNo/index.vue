<template>
	<page-content>
		<div id="PartSearchBox" style="position: relative">
			<n-card size="small" title="编号生成管理">
				<template #header>
					<n-form :model="searchForm" inline label-placement="left" label-width="auto" class="search-card">
						<n-form-item label="类型信息">
							<n-input
								v-model:value="searchForm.query"
								placeholder="类型编码或类型名称"
								@keydown.enter="resetTableList"
								clearable
								size="small"
							/>
						</n-form-item>
						<n-form-item>
							<n-button type="primary" size="small" @click="resetTableList" style="margin-right: 10px">查询 </n-button>
							<n-button size="small" @click="reset">重置 </n-button>
						</n-form-item>
					</n-form>
				</template>
				<template #header-extra>
					<n-button size="small" type="primary" @click="addGenNo">新增编号</n-button>
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
					<n-divider vertical />
				</template>
				<vxe-table
					stripe
					ref="tableRef"
					:data="tableList"
					:height="height - 130"
					:loading="tableLoading"
					:size="tableSize"
					align="center"
					border="none"
					resizable
					show-header-overflow="title"
					show-overflow
				>
					<vxe-column field="typeCode" show-overflow="title" title="类型编码" min-width="150"></vxe-column>
					<vxe-column field="typeName" show-overflow="title" title="类型名称" min-width="150"></vxe-column>
					<vxe-column field="noPrefix" min-width="100" show-overflow="title" title="编号前缀"></vxe-column>
					<vxe-column field="currNo" min-width="150" show-overflow="title" title="当前编号"></vxe-column>
					<vxe-column field="containYear" min-width="100" show-overflow="title" title="是否包含年">
						<template #default="{ row }">
							<option-badge :options="genNoOption" :val="row.containYear" />
						</template>
					</vxe-column>
					<vxe-column field="containMonth" min-width="100" show-overflow="title" title="是否包含月">
						<template #default="{ row }">
							<option-badge :options="genNoOption" :val="row.containMonth" />
						</template>
					</vxe-column>
					<vxe-column field="containDay" min-width="100" show-overflow="title" title="是否包含日">
						<template #default="{ row }">
							<option-badge :options="genNoOption" :val="row.containDay" />
						</template>
					</vxe-column>
					<vxe-column field="digit" min-width="100" show-overflow="title" title="递增码位数"> </vxe-column>
					<vxe-column field="updateTime" show-overflow="title" title="更新时间" min-width="150"></vxe-column>
					<vxe-column fixed="right" title="操作" min-width="200">
						<template #default="{ row }">
							<n-button quaternary size="small" type="primary" @click="editGenNo(row)">编辑</n-button>
							<n-popconfirm @positive-click="deleteGenNo(row)">
								<template #trigger>
									<n-button quaternary size="small" type="error">删除</n-button>
								</template>
								是否确定删除该编码吗?
							</n-popconfirm>
						</template>
					</vxe-column>
					<template #empty>
						<n-empty description="空空如也"></n-empty>
					</template>
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
			<create-from ref="createFromRef" @ok="getTableData"></create-from>
		</div>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import useTableData from "@/hooks/useTableData";
import { useWindowSize } from "@/hooks/useWindowSize";
import useTable from "@/hooks/useTable";
import { delGenNo, getPageList } from "@/api/system/genNo";
import CreateFrom from "./comm/create-from.vue";
import { ifcacheOptions as genNoOption } from "@/constant/system/resource";

defineOptions({ name: "genNo" });

const createFromRef = ref();
const tableRef = ref();
const { height } = useWindowSize();
const { tableSizeOptions, tableSize } = useTable();
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, getTableData, reset, resetTableList } =
	useTableData({
		requestMethod: getPageList,
		formData: { query: "", deviceId: null }
	});

// 删除编码
const deleteGenNo = row => {
	delGenNo({ code: row.typeCode }).then(res => {
		if (res.success) {
			getTableData();
		}
	});
};

// 新增编码
const addGenNo = () => {
	createFromRef.value.addGenNo();
};

// 编辑编码
const editGenNo = row => {
	createFromRef.value.editGenNo(row.typeCode);
};
</script>

<style lang="less" scoped>
.search-card {
	::v-deep(.n-form-item-feedback-wrapper) {
		display: none;
	}
}
</style>

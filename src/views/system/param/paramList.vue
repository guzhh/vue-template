<template>
	<n-card :content-style="{ height: windowSize.height.value - 10 + 'px', width: '100%', padding: '15px' }">
		<div style="display: flex; justify-content: space-between">
			<n-form ref="formRef" :label-width="80" :model="searchForm" inline label-placement="left">
				<n-form-item label="查询:" path="query">
					<n-input v-model:value="searchForm.query" placeholder="参数编码/参数名称" @keydown.enter.prevent="resetTableList" />
				</n-form-item>
				<n-form-item>
					<n-button type="primary" @click="resetTableList"> 查询</n-button>
				</n-form-item>
				<n-form-item>
					<n-button type="primary" @click="reset"> 重置</n-button>
				</n-form-item>
			</n-form>
			<n-button type="primary" @click="addParam"> 新增</n-button>
		</div>
		<div :style="{ height: windowSize.height.value - 100 + 'px' }">
			<div style="height: calc(100% - 40px)">
				<vxe-table
					:data="tableList"
					:loading="tableLoading"
					align="center"
					border
					height="100%"
					resizable
					show-header-overflow="title"
					show-overflow
					size="small"
				>
					<vxe-column field="id" show-overflow="title" title="id" width="50px"></vxe-column>
					<vxe-column field="paramCode" min-width="100px" show-overflow="title" title="参数编码"></vxe-column>
					<vxe-column field="paramName" min-width="100px" show-overflow="title" title="参数名称"></vxe-column>
					<vxe-column field="paramDescr" min-width="200px" show-overflow="title" title="参数描述"></vxe-column>
					<vxe-column field="paramVal" min-width="100px" show-overflow="title" title="参数值"></vxe-column>
					<vxe-column title="操作" width="150px">
						<template #default="{ row }">
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
					style="margin-top: 5px; display: flex; justify-content: right"
					@update:page="onChange"
					@update:page-size="onUpdatePageSize"
				>
					<template #suffix> 共 {{ page.totalResult }} 条数据</template>
				</n-pagination>
			</div>
		</div>
		<param-form ref="paramFormRef" @ok="resetTableList"></param-form>
	</n-card>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { getDictList, delParam } from "@/api/system/param";
import useTableData from "@/hooks/useTableData.js";
import { useWindowSize } from "@/hooks/useWindowSize";
import ParamForm from "@/views/system/param/modules/paramForm.vue";

const message = useMessage();
const paramFormRef = ref();
const windowSize = useWindowSize();
const formData = { query: "" };
// eslint-disable-next-line no-unused-vars
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, resetTableList, getTableData } = useTableData({
	requestMethod: getDictList,
	formData,
	initDataCallBack: () => {
		console.log(windowSize);
	}
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

// 删除参数
const deleteParam = row => {
	delParam({ id: row.id }).then(res => {
		if (res.success) {
			message.success("删除成功");
			resetTableList();
		}
	});
};
</script>

<style scoped></style>

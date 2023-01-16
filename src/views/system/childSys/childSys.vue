<template>
	<n-card :content-style="{ height: windowSize.height.value - 10 + 'px', width: '100%', padding: '15px' }">
		<div style="display: flex; justify-content: space-between">
			<n-form ref="formRef" :label-width="120" :model="searchForm" inline label-placement="left">
				<n-form-item label="系统名称:" path="sysName">
					<n-input v-model:value="searchForm.sysName" placeholder="请输入系统名称" @keydown.enter.prevent="resetTableList" />
				</n-form-item>
				<n-form-item label="是否内部系统:" path="sysName">
					<n-select
						v-model:value="searchForm.ifInternal"
						:options="options"
						clearable
						style="width: 200px"
						@update:value="resetTableList"
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
				<n-form-item>
					<n-button type="primary" @click="resetTableList"> 查询</n-button>
				</n-form-item>
				<n-form-item>
					<n-button type="primary" @click="reset"> 重置</n-button>
				</n-form-item>
			</n-form>
			<n-button type="primary" @click="add"> 新增</n-button>
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
					<vxe-column field="sysName" min-width="100px" show-overflow="title" title="系统名称"></vxe-column>
					<vxe-column field="sysDescr" min-width="100px" show-overflow="title" title="系统描述"></vxe-column>
					<vxe-column field="sysIndexUrl" min-width="200px" show-overflow="title" title="系统首页地址"></vxe-column>
					<vxe-column field="ifInternal" min-width="100px" show-overflow="title" title="是否内部系统">
						<template #default="{ row }">
							<n-tag v-if="row.ifInternal === 1" type="success">是</n-tag>
							<n-tag v-else-if="row.ifInternal === 0" type="error">否</n-tag>
						</template>
					</vxe-column>
					<vxe-column field="sysType" min-width="100px" show-overflow="title" title="系统类型">
						<template #default="{ row }">
							<span v-if="row.sysType === 1">B/S架构</span>
							<span v-else-if="row.sysType === 2">C/S架构</span>
						</template>
					</vxe-column>
					<vxe-column field="sysLogo" min-width="100px" show-overflow="title" title="系统logo"></vxe-column>
					<vxe-column field="showNum" min-width="100px" show-overflow="title" title="显示顺序"></vxe-column>
					<vxe-column field="ifDel" min-width="100px" show-overflow="title" title="是否删除">
						<template #default="{ row }">
							<n-tag v-if="row.ifDel === 0" type="success">未删除</n-tag>
							<n-tag v-else-if="row.ifDel === 1" type="error">已删除</n-tag>
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
									<n-button text type="error"> 撤销删除</n-button>
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
					style="margin-top: 5px; display: flex; justify-content: right"
					@update:page="onChange"
					@update:page-size="onUpdatePageSize"
				>
					<template #suffix> 共 {{ page.totalResult }} 条数据</template>
				</n-pagination>
			</div>
		</div>
		<create-form ref="createFormRef" @ok="resetTableList"></create-form>
	</n-card>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ref } from "vue";
import { useMessage } from "naive-ui";
import useTableData from "@/hooks/useTableData.js";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getAuthSystemList, delSystem, cancelDelSystem } from "@/api/system/childSys";
import CreateForm from "@/views/system/childSys/modules/createForm.vue";

const createFormRef = ref();
// eslint-disable-next-line no-unused-vars
const message = useMessage();
const windowSize = useWindowSize();
const formData = { ifInternal: undefined, sysName: "", sysType: undefined };
// eslint-disable-next-line no-unused-vars
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, resetTableList, getTableData } = useTableData({
	requestMethod: getAuthSystemList,
	formData,
	initDataCallBack: () => {
		console.log(windowSize);
	}
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

<style scoped></style>

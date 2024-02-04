<template>
	<base-modal style="width: 1100px" title="字典列表" v-model:show="visible" :footer="false" @close="handleClose">
		<n-card size="small">
			<n-form inline label-placement="left" label-width="auto" :show-feedback="false" size="small">
				<n-space>
					<n-form-item label="字典名称/编码">
						<n-input v-model:value="queryStr" placeholder="字典名称/编码" @keydown.stop.enter="getDictList"></n-input>
					</n-form-item>
					<n-form-item label="字典状态">
						<n-select
							placeholder="请选择字典状态"
							clearable
							style="width: 150px"
							v-model:value="state"
							:options="[
								{ value: 0, label: '禁用' },
								{ value: 1, label: '启用' }
							]"
						/>
					</n-form-item>
					<n-button size="small" type="primary" @click="getDictList">查询</n-button>
					<n-button size="small" @click="resetQuery">重置</n-button>
					<n-button size="small" type="primary" @click="addDict">新增字典</n-button>
				</n-space>
			</n-form>
		</n-card>
		<n-card size="small" style="margin-top: 15px">
			<vxe-table
				stripe
				ref="tableRef"
				:data="tableData"
				:loading="tableLoading"
				size="mini"
				align="center"
				border="none"
				:max-height="500"
				resizable
				row-id="code"
				show-header-overflow="title"
				show-overflow
				:row-config="{ isHover: true, isCurrent: true }"
			>
				<vxe-column field="id" show-overflow="title" title="字典ID" width="80px"></vxe-column>
				<vxe-column field="pcode" show-overflow="title" title="上级字典编码" width="150px"></vxe-column>
				<vxe-column field="code" min-width="100px" show-overflow="title" title="字典编码"></vxe-column>
				<vxe-column field="name" min-width="100px" show-overflow="title" title="字典名称"></vxe-column>
				<vxe-column field="dictVal" min-width="200px" show-overflow="title" title="字典值"></vxe-column>
				<vxe-column field="sortNum" min-width="100px" show-overflow="title" title="排序值"></vxe-column>
				<vxe-column field="state" min-width="100px" show-overflow="title" title="字典状态">
					<template #default="{ row }">
						<option-badge :options="disableEnableOption" :val="row.state" />
					</template>
				</vxe-column>
				<vxe-column title="操作" width="100px">
					<template #default="{ row }">
						<n-space>
							<n-button text type="primary" @click="editParam(row)"> 编辑</n-button>
							<n-popconfirm @positive-click="deleteDict(row)">
								<template #trigger>
									<n-button text type="error"> 删除</n-button>
								</template>
								确定要删除该字典吗？
							</n-popconfirm>
						</n-space>
					</template>
				</vxe-column>
			</vxe-table>
		</n-card>
		<create-form ref="createFormRef" @ok="getDictList"></create-form>
	</base-modal>
</template>

<script setup>
import { useMessage } from "naive-ui";
import { delDictById, getDictByPCodes } from "@/api/system/dictList";
import { disableEnableOption } from "@/constant/system/resource";
import CreateForm from "./create-form.vue";

const createFormRef = ref();
const tableData = ref([]);
const message = useMessage();
const visible = ref(false);
const tableLoading = ref(false);
const state = ref(null); // 字典状态
const pcode = ref(""); // 上级字典编码
const queryStr = ref("");

const open = row => {
	pcode.value = row.code;
	// eslint-disable-next-line no-use-before-define
	getDictList();
	visible.value = true;
};

// 根据上级编码获取下级字典集合
const getDictList = () => {
	tableLoading.value = true;
	getDictByPCodes({ pcodes: pcode.value, state: state.value, query: queryStr.value })
		.then(res => {
			if (res.success) {
				tableData.value = res.result[pcode.value];
			}
		})
		.finally(() => {
			tableLoading.value = false;
		});
};

// 新增字典
const addDict = () => {
	createFormRef.value.add(pcode.value);
};

// 编辑字典
const editParam = row => {
	createFormRef.value.edit(row);
};

// 删除字典
const deleteDict = row => {
	delDictById({ id: row.id }).then(res => {
		if (res.success) {
			message.success("字典删除成功");
			getDictList();
		}
	});
};

// 关闭弹窗时清空数据
const handleClose = () => {
	state.value = null;
	queryStr.value = "";
	tableData.value = [];
};

// 重置查询条件
const resetQuery = () => {
	state.value = null;
	queryStr.value = "";
	getDictList();
};

defineExpose({ open });
</script>

<style scoped></style>

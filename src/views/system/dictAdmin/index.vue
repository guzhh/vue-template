<template>
	<page-content>
		<n-card size="small" title="字典列表">
			<template #header-extra>
				<n-button size="small" type="primary" @click="addDict('')"> 新增字典</n-button>
				<n-tooltip>
					<span>折叠</span>
					<template #trigger>
						<n-icon size="17" style="margin-left: 15px" @click="$refs.tableRef.clearTreeExpand()">
							<ArrowBetweenDown24Filled />
						</n-icon>
					</template>
				</n-tooltip>
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
				ref="tableRef"
				:data="tableData"
				:height="height - 80"
				:loading="tableLoading"
				:size="tableSize"
				align="center"
				border
				resizable
				row-id="code"
				show-header-overflow="title"
				show-overflow
			>
				<vxe-column field="id" show-overflow="title" title="字典ID" width="80px"></vxe-column>
				<vxe-column field="pcode" show-overflow="title" title="上级字典编码" width="150px"></vxe-column>
				<vxe-column field="code" min-width="100px" show-overflow="title" title="字典编码"></vxe-column>
				<vxe-column field="name" min-width="100px" show-overflow="title" title="字典名称"></vxe-column>
				<vxe-column field="dictVal" min-width="200px" show-overflow="title" title="字典值"></vxe-column>
				<vxe-column field="state" min-width="100px" show-overflow="title" title="字典状态">
					<template #default="{ row }">
						<option-badge :options="disableEnableOption" :val="row.state" />
					</template>
				</vxe-column>
				<vxe-column title="操作" width="200px">
					<template #default="{ row }">
						<n-button text type="primary" @click="editParam(row)"> 编辑</n-button>
						<n-button quaternary size="small" type="info" @click="dictModal(row)">字典 </n-button>
						<n-popconfirm @positive-click="deleteDict(row)">
							<template #trigger>
								<n-button text type="error"> 删除</n-button>
							</template>
							确定要删除该字典吗？
						</n-popconfirm>
					</template>
				</vxe-column>
			</vxe-table>
		</n-card>
		<create-form ref="createFormRef" @ok="getTableData"></create-form>
		<DictModal ref="dictModalRef"></DictModal>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getDictList, delDict } from "@/api/system/dictList";
import CreateForm from "@/views/system/dictAdmin/components/create-form.vue";
import DictModal from "@/views/system/dictAdmin/components/dictModal.vue";
import useTable from "@/hooks/useTable";
import { disableEnableOption } from "@/constant/system/resource";

defineOptions({ name: "dict" });

const tableRef = ref();
const { tableSizeOptions, tableSize } = useTable();
const message = useMessage();
const createFormRef = ref();
const dictModalRef = ref();
const { height } = useWindowSize();
const tableData = ref([]);
const tableLoading = ref(false);

// 新增顶级字典
const addDict = pcode => {
	createFormRef.value.add(pcode);
};

// 下级字典管理
const dictModal = data => {
	dictModalRef.value.open(data);
};

// 编辑字典
const editParam = row => {
	createFormRef.value.edit(row);
};

// 查询
const getTableData = () => {
	tableLoading.value = true;
	tableData.value = [];
	// 加载顶级节点
	getDictList({ pcode: 0 })
		.then(res => {
			if (res.success) {
				tableData.value = res.result.map(item => {
					return { ...item, hasChild: true };
				});
			}
		})
		.finally(() => {
			tableLoading.value = false;
		});
};

// 删除字典
const deleteDict = row => {
	delDict({ code: row.code }).then(res => {
		if (res.success) {
			message.success("字典删除成功");
			getTableData();
		}
	});
};
getTableData();
</script>

<style scoped></style>

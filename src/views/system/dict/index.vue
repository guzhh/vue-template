<template>
	<page-content>
		<n-card size="small" title="字典列表">
			<template #header>
				<n-form inline label-placement="left" :model="searchForm" label-width="auto" :show-feedback="false" size="small">
					<n-space>
						<n-form-item label="顶级节点" path="pcode" v-if="false">
							<n-input
								v-model:value="searchForm.pcode"
								placeholder="顶级节点,默认为0"
								@keydown.stop.enter="resetTableList"
							></n-input>
						</n-form-item>
						<n-form-item label="字典名称/编码" path="query">
							<n-input
								v-model:value="searchForm.query"
								placeholder="字典名称/编码"
								@keydown.stop.enter="resetTableList"
							></n-input>
						</n-form-item>
						<n-form-item label="字典状态" path="state">
							<n-select
								placeholder="请选择字典状态"
								clearable
								style="width: 150px"
								v-model:value="searchForm.state"
								:options="disableEnableOption"
								@update:value="resetTableList"
							/>
						</n-form-item>
						<n-button size="small" type="primary" @click="resetTableList">查询</n-button>
						<n-button size="small" @click="resetQuery">重置</n-button>
					</n-space>
				</n-form>
			</template>
			<template #header-extra>
				<n-button size="small" type="primary" @click="addDict('')"> 新增字典</n-button>
				<n-button size="small" @click="rebuildTheCache('')" style="margin-left: 10px">清除缓存</n-button>
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
				stripe
				ref="tableRef"
				:data="tableList"
				:height="height - 120"
				:loading="tableLoading"
				:size="tableSize"
				align="center"
				border="none"
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
				<vxe-column title="操作" width="200px">
					<template #default="{ row }">
						<n-button text type="primary" @click="editParam(row)" style="margin-right: 5px"> 编辑</n-button>
						<n-button quaternary size="small" type="info" @click="dictModal(row)" v-if="row.pcode === '0'">字典 </n-button>
						<n-popconfirm @positive-click="deleteDict(row)">
							<template #trigger>
								<n-button text type="error"> 删除</n-button>
							</template>
							确定要删除该字典吗？
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
		<create-form ref="createFormRef" @ok="getTableData"></create-form>
		<DictModal ref="dictModalRef"></DictModal>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getDictList, delDictById, clsDictCache } from "@/api/system/dictList";
import CreateForm from "@/views/system/dict/components/create-form.vue";
import DictModal from "@/views/system/dict/components/dictModal.vue";
import useTable from "@/hooks/useTable";
import { disableEnableOption } from "@/constant/system/resource";
import useTableData from "@/hooks/useTableData";

defineOptions({ name: "dict" });

const tableRef = ref();
const { tableSizeOptions, tableSize } = useTable();
const message = useMessage();
const createFormRef = ref();
const dictModalRef = ref();
const { height } = useWindowSize();

// 查询条件
const defaultVal = { state: 1, query: "", pcode: "0" };
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, resetTableList, getTableData } = useTableData({
	requestMethod: getDictList,
	formData: defaultVal
});

// 新增顶级字典
const addDict = pcode => {
	createFormRef.value.add(pcode);
};

const rebuildTheCache = () => {
	clsDictCache({});
};

// 下级字典管理
const dictModal = data => {
	dictModalRef.value.open(data);
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
			resetTableList();
		}
	});
};
// 重置查询条件
const resetQuery = () => {
	searchForm.value = { ...defaultVal };
	resetTableList();
};
</script>

<style scoped></style>

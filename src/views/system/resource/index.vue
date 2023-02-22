<template>
	<page-content>
		<n-card size="small" title="资源列表">
			<template #header-extra>
				<n-button size="small" type="primary" @click="addNewResources">新增资源</n-button>
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
						<n-icon size="17" @click="getData">
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
				:height="height - 90"
				:loading="tableLoading"
				:size="tableSize"
				:tree-config="{ children: 'children', expandAll: true, reserve: true }"
				align="center"
				resizable
				row-id="id"
				style="margin-top: 10px"
			>
				<vxe-column field="name" min-width="150px" show-overflow="title" title="资源名称" tree-node></vxe-column>
				<vxe-column field="url" min-width="120px" show-overflow="title" title="资源地址"></vxe-column>
				<vxe-column field="compName" min-width="120px" show-overflow="title" title="组件名称"></vxe-column>
				<vxe-column field="showNum" min-width="80px" show-overflow="title" title="资源序号"></vxe-column>
				<vxe-column field="icon" min-width="80px" show-overflow="title" title="资源图标">
					<template #default="{ row }">
						<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">
							<component :is="row.icon" style="width: 18px" />
						</div>
					</template>
				</vxe-column>
				<vxe-column field="permissionFlag" min-width="120px" show-overflow="title" title="权限标识"></vxe-column>
				<vxe-column field="type" min-width="80px" show-overflow="title" title="资源类型">
					<template #default="{ row }">
						<option-badge :options="typeFlagOptions" :val="row.type" />
					</template>
				</vxe-column>
				<vxe-column field="ifHidden" min-width="120px" show-overflow="title" title="是否隐藏菜单">
					<template #default="{ row }">
						<option-badge :options="ifcacheOptions" :val="row.ifHidden" />
					</template>
				</vxe-column>
				<vxe-column field="ifcache" min-width="80px" show-overflow="title" title="是否缓存">
					<template #default="{ row }">
						<option-badge :options="ifcacheOptions" :val="row.ifcache" />
					</template>
				</vxe-column>
				<vxe-column field="linkType" min-width="80px" show-overflow="title" title="链接类型">
					<template #default="{ row }">
						<option-badge :options="lintTypeOptions" :val="row.linkType" />
					</template>
				</vxe-column>
				<vxe-column field="linkValue" min-width="120px" show-overflow="title" title="链接值"></vxe-column>
				<vxe-column field="extend" min-width="120px" show-overflow="title" title="扩展字段"></vxe-column>
				<vxe-column fixed="right" title="操作" width="180px">
					<template #default="{ row }">
						<n-button quaternary size="small" type="primary" @click="editResources(row)">编辑</n-button>
						<n-button quaternary size="small" type="info" @click="cloning(row)">克隆</n-button>
						<n-popconfirm @positive-click="deleteById(row)">
							<template #trigger>
								<n-button quaternary size="small" type="error">删除</n-button>
							</template>
							是否确定删除该资源?
						</n-popconfirm>
					</template>
				</vxe-column>
			</vxe-table>
		</n-card>
		<resource-form ref="resourceFormRef" :treeData="tableData" @ok="getData"></resource-form>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getResourceList, delResource } from "@/api/system/resource";
import { setTreeData } from "@/utils/tree";
import useTable from "@/hooks/useTable";
import ResourceForm from "@/views/system/resource/components/resource-form.vue";
import { lintTypeOptions, ifcacheOptions, typeFlagOptions } from "@/constant/system/resource";

defineOptions({ name: "resource" });

const { height } = useWindowSize();
const { tableSizeOptions, tableSize } = useTable();

const resourceFormRef = ref();
const tableLoading = ref();
const tableData = ref([]);

const getData = () => {
	tableLoading.value = true;
	getResourceList()
		.then(res => {
			if (res.success) {
				tableData.value = setTreeData(res.result, "id", "pid");
			}
		})
		.finally(() => {
			tableLoading.value = false;
		});
};
getData();

// 添加资源
const addNewResources = () => {
	resourceFormRef.value.openModal();
};

// 编辑资源
const editResources = row => {
	resourceFormRef.value.edit({ ...row, children: undefined });
};

// 克隆资源
const cloning = row => {
	resourceFormRef.value.cloning(row);
};

const deleteById = row => {
	delResource({ id: row.id }).then(res => {
		if (res.success) {
			getData();
		}
	});
};
</script>

<style scoped></style>

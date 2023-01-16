<template>
	<page-content>
		<n-card size="small" title="资源列表">
			<template #header-extra>
				<n-button type="primary" size="small" @click="addNewResources">新增资源</n-button>
				<n-tooltip>
					<span>折叠</span>
					<template #trigger>
						<n-icon @click="$refs.tableRef.clearTreeExpand()" size="17" style="margin-left: 15px">
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
				<n-tooltip>
					<span>列设置</span>
					<template #trigger>
						<n-icon size="17">
							<Settings48Regular />
						</n-icon>
					</template>
				</n-tooltip>
			</template>

			<vxe-table
				resizable
				row-id="id"
				align="center"
				ref="tableRef"
				:size="tableSize"
				:height="height - 95"
				:loading="tableLoading"
				style="margin-top: 10px"
				:tree-config="{ children: 'children', expandAll: true, reserve: true }"
				:data="tableData"
			>
				<vxe-column field="name" title="资源名称" tree-node min-width="150px" show-overflow="title"></vxe-column>
				<vxe-column field="url" title="资源地址" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column field="compName" title="组件名称" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column field="showNum" title="资源序号" min-width="80px" show-overflow="title"></vxe-column>
				<vxe-column field="icon" title="资源图标" min-width="80px" show-overflow="title">
					<template #default="{ row }">
						<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">
							<component :is="row.icon" style="width: 18px" />
						</div>
					</template>
				</vxe-column>
				<vxe-column field="permissionFlag" title="权限标识" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column field="type" title="资源类型" min-width="80px" show-overflow="title">
					<template #default="{ row }">
						<option-badge :options="typeFlagOptions" :val="row.type" />
					</template>
				</vxe-column>
				<vxe-column field="ifHidden" title="是否隐藏菜单" min-width="120px" show-overflow="title">
					<template #default="{ row }">
						<option-badge :options="ifcacheOptions" :val="row.ifHidden" />
					</template>
				</vxe-column>
				<vxe-column field="ifcache" title="是否缓存" min-width="80px" show-overflow="title">
					<template #default="{ row }">
						<option-badge :options="ifcacheOptions" :val="row.ifcache" />
					</template>
				</vxe-column>
				<vxe-column field="linkType" title="链接类型" min-width="80px" show-overflow="title">
					<template #default="{ row }">
						<option-badge :options="lintTypeOptions" :val="row.linkType" />
					</template>
				</vxe-column>
				<vxe-column field="linkValue" title="链接值" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column field="extend" title="扩展字段" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column title="操作" width="180px" fixed="right">
					<template #default="{ row }">
						<n-button quaternary type="primary" size="small" @click="editResources(row)">编辑</n-button>
						<n-button quaternary type="info" size="small" @click="cloning(row)">克隆</n-button>
						<n-popconfirm @positive-click="deleteById(row)">
							<template #trigger>
								<n-button type="error" quaternary size="small">删除</n-button>
							</template>
							是否确定删除该资源?
						</n-popconfirm>
					</template>
				</vxe-column>
			</vxe-table>
		</n-card>
		<resource-form :treeData="tableData" ref="resourceFormRef" @ok="getData"></resource-form>
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
	resourceFormRef.value.edit(row);
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

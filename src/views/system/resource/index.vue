<template>
	<page-content>
		<n-card size="small" title="资源列表">
			<template #header-extra>
				<n-button type="primary" size="small">新增资源</n-button>
				<n-tooltip>
					<span>折叠</span>
					<template #trigger>
						<n-icon size="17" style="margin-left: 15px"><ArrowBetweenDown24Filled /></n-icon>
					</template>
				</n-tooltip>
				<n-divider vertical />
				<n-tooltip>
					<span>刷新</span>
					<template #trigger>
						<n-icon size="17" @click="getData"><Refresh /></n-icon>
					</template>
				</n-tooltip>
				<n-divider vertical />
				<n-tooltip>
					<span>密度</span>
					<template #trigger>
						<n-icon size="17"><AutoFitHeight20Filled /></n-icon>
					</template>
				</n-tooltip>
				<n-divider vertical />
				<n-tooltip>
					<span>列设置</span>
					<template #trigger>
						<n-icon size="17"><Settings48Regular /></n-icon>
					</template>
				</n-tooltip>
			</template>

			<vxe-table
				size="small"
				:height="height - 95"
				:loading="tableLoading"
				resizable
				border
				row-id="code"
				align="center"
				style="margin-top: 10px"
				:tree-config="{ children: 'children', expandAll: true, reserve: true }"
				:data="tableData"
			>
				<vxe-column field="name" title="资源名称" tree-node min-width="150px" show-overflow="title"></vxe-column>
				<vxe-column field="url" title="资源地址" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column field="component" title="组件名称" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column field="seqNum" title="资源序号" min-width="80px" show-overflow="title"></vxe-column>
				<vxe-column field="icon" title="资源图标" min-width="80px" show-overflow="title">
					<template #default="{ row }">
						<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">
							<component :is="row.icon" style="width: 24px" />
						</div>
					</template>
				</vxe-column>
				<vxe-column field="permissionFlag" title="权限标识" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column field="typeFlag" title="资源类型" min-width="80px" show-overflow="title">
					<template #default="{ row }">
						<span v-if="row.typeFlag === 1">菜单</span>
						<span v-else-if="row.typeFlag === 2">按钮</span>
						<span v-else-if="row.typeFlag === 3">扩展页面</span>
					</template>
				</vxe-column>
				<vxe-column field="hidden" title="是否隐藏菜单" min-width="120px" show-overflow="title">
					<template #default="{ row }">
						<n-tag type="info" v-if="row.hidden == 0">否</n-tag>
						<n-tag type="error" v-else>是</n-tag>
					</template>
				</vxe-column>
				<vxe-column field="ifcache" title="是否缓存" min-width="80px" show-overflow="title">
					<template #default="{ row }">
						<n-tag type="info" v-if="row.ifcache == 0">否</n-tag>
						<n-tag type="error" v-else>是</n-tag>
					</template>
				</vxe-column>
				<vxe-column field="ifreport" title="是否报表" min-width="80px" show-overflow="title">
					<template #default="{ row }">
						<n-tag type="info" v-if="row.ifreport == 0">否</n-tag>
						<n-tag type="error" v-else>是</n-tag>
					</template>
				</vxe-column>
				<vxe-column field="reportUrl" title="报表地址" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column title="操作" width="180px" fixed="right">
					<!--          <template #default="{ row }">-->
					<!--            <n-button quaternary type="primary" size="small" @click="editResources(row)">编辑</n-button>-->
					<!--            <n-button quaternary type="info" size="small" @click="cloning(row)">克隆</n-button>-->
					<!--            <n-popconfirm @positive-click="deleteById(row)">-->
					<!--              <template #trigger>-->
					<!--                <n-button type="error" quaternary size="small">删除</n-button>-->
					<!--              </template>-->
					<!--              是否确定删除该资源?-->
					<!--            </n-popconfirm>-->
					<!--          </template>-->
				</vxe-column>
			</vxe-table>
		</n-card>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getResourceList } from "@/api/system/resource";
import { setTreeData } from "@/utils/tree";

defineOptions({ name: "resource" });

const { height } = useWindowSize();

const tableLoading = ref();
const tableData = [];

const getData = () => {
	tableLoading.value = true;
	getResourceList({ pid: 0 })
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
</script>

<style scoped></style>

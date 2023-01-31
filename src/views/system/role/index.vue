<template>
	<page-content>
		<n-card size="small">
			<n-form class="search-card" inline label-placement="left" ref="formRef" :label-width="80" :model="searchForm">
				<n-form-item path="sysId" label="所属系统">
					<n-select
						filterable
						style="width: 180px"
						v-model:value="searchForm.sysId"
						:options="systemList"
						placeholder="请选择所属系统"
					/>
				</n-form-item>
				<n-form-item label="角色名称" path="name">
					<n-input v-model:value="searchForm.user" placeholder="请输入角色名称" />
				</n-form-item>
				<n-form-item>
					<n-button type="primary" attr-type="button" @click="getTableData">搜 索</n-button>
					<n-button attr-type="button" style="margin-left: 10px" @click="reset">重 置</n-button>
				</n-form-item>
			</n-form>
		</n-card>
		<n-card size="small" title="角色列表" style="margin-top: 10px">
			<template #header-extra>
				<n-button type="primary" size="small" @click="addRole">新增角色</n-button>
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
				resizable
				border
				show-overflow
				align="center"
				:data="tableList"
				:size="tableSize"
				:height="height - 190"
				:loading="tableLoading"
				show-header-overflow="title"
			>
				<vxe-column field="id" title="ID" width="50" show-overflow="title"></vxe-column>
				<vxe-column field="sysId" title="所属系统ID" width="100" show-overflow="title"></vxe-column>
				<vxe-column field="name" title="角色名称" min-width="100" show-overflow="title"></vxe-column>
				<vxe-column field="descr" title="角色描述" min-width="200" show-overflow="title"></vxe-column>
				<vxe-column field="createTime" title="创建时间" width="200" show-overflow="title"></vxe-column>
				<vxe-column title="操作" width="200px" fixed="right">
					<template #default="{ row }">
						<!--            <n-button quaternary type="info" size="small" @click="setRes(row)" v-if="row.id != 1">分配资源</n-button>-->
						<n-button quaternary type="primary" size="small" @click="editRole(row)">编辑</n-button>
						<n-popconfirm @positive-click="deleteRole(row)">
							<template #trigger>
								<n-button type="error" quaternary size="small">删除</n-button>
							</template>
							是否确定删除该角色吗?
						</n-popconfirm>
						<n-dropdown trigger="click" :options="moreOptions" @select="key => moreHandleSelect(key, row)">
							<n-button quaternary type="info" size="small">更多操作</n-button>
						</n-dropdown>
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
				style="margin-top: 5px; display: flex; justify-content: right"
				@update:page="onChange"
				@update:page-size="onUpdatePageSize"
			>
				<template #suffix> 共 {{ page.totalResult }} 条数据</template>
			</n-pagination>
		</n-card>
		<role-form ref="roleFormRef" :system-list="systemList" @ok="getTableData"></role-form>
		<allocate-resources ref="allocateResourcesRef" @ok="getTableData"></allocate-resources>
		<data-rules ref="dataRulesRef"></data-rules>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import useTableData from "@/hooks/useTableData";
import { delRole, getRoleList } from "@/api/system/role";
import { useWindowSize } from "@/hooks/useWindowSize";
import useTable from "@/hooks/useTable";
import { getSystemList } from "@/api/system/resource";
import RoleForm from "@/views/system/role/components/role-form.vue";
import AllocateResources from "@/views/system/role/components/allocate-resources.vue";
import DataRules from "@/views/system/role/components/data-rules.vue";

defineOptions({ name: "role" });

const moreOptions = [
	{ label: "分配资源", key: "distribution" },
	{ label: "数据规则", key: "dataRules" }
];
const roleFormRef = ref();
const dataRulesRef = ref();
const allocateResourcesRef = ref();
const { height } = useWindowSize();
const { tableSizeOptions, tableSize } = useTable();

const systemList = ref([]);
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, getTableData, reset } = useTableData({
	requestMethod: getRoleList,
	formData: { name: "", sysId: null }
});

// 选择更多操作
const moreHandleSelect = (key, row) => {
	if (key === "distribution") allocateResourcesRef.value.open(row);
	if (key === "dataRules") dataRulesRef.value.open(row);
};

// 获取系统列表
getSystemList({ ifInternal: 1 }).then(res => {
	if (res.success) {
		systemList.value = res.result.map(item => {
			return { label: item.sysName, value: item.id };
		});
	}
});

// 删除角色
const deleteRole = row => {
	delRole({ id: row.id }).then(res => {
		if (res.success) {
			getTableData();
		}
	});
};

// 新增角色
const addRole = () => {
	roleFormRef.value.addRole();
};

// 编辑角色
const editRole = row => {
	roleFormRef.value.editRole(row);
};
</script>

<style scoped lang="less">
.search-card {
	::v-deep(.n-form-item-feedback-wrapper) {
		display: none;
	}
}
</style>

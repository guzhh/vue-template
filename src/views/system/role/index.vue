<template>
	<page-content>
		<div id="roleSearchBox" style="position: relative">
			<n-card size="small" title="角色列表">
				<template #header-extra>
					<n-button size="small" type="primary" @click="addRole">新增角色</n-button>
					<n-divider vertical />
					<search-box :placement="'top'" :to="'#roleSearchBox'" @reset="reset" @search="resetTableList">
						<n-form ref="formRef" :label-width="80" :model="searchForm" class="search-card" inline label-placement="left">
							<n-form-item label="所属系统" path="sysId">
								<n-select
									v-model:value="searchForm.sysId"
									:options="systemList"
									filterable
									placeholder="请选择所属系统"
									style="width: 180px"
								/>
							</n-form-item>
							<n-form-item label="角色名称" path="name">
								<n-input v-model:value="searchForm.name" placeholder="请输入角色名称" />
							</n-form-item>
						</n-form>
					</search-box>
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
					:data="tableList"
					:height="height - 110"
					:loading="tableLoading"
					:size="tableSize"
					align="center"
					border
					resizable
					show-header-overflow="title"
					show-overflow
				>
					<vxe-column field="id" show-overflow="title" title="ID" width="50"></vxe-column>
					<vxe-column field="sysId" show-overflow="title" title="所属系统ID" width="100"></vxe-column>
					<vxe-column field="name" min-width="100" show-overflow="title" title="角色名称"></vxe-column>
					<vxe-column field="dataScope" min-width="120" show-overflow="title" title="数据范围">
						<template #default="{ row }">
							<option-badge :options="dataScopeOptions" :val="row.dataScope" />
						</template>
					</vxe-column>
					<vxe-column field="descr" min-width="200" show-overflow="title" title="角色描述"></vxe-column>
					<vxe-column field="createTime" show-overflow="title" title="创建时间" width="200"></vxe-column>
					<vxe-column fixed="right" title="操作" width="200px">
						<template #default="{ row }">
							<!--            <n-button quaternary type="info" size="small" @click="setRes(row)" v-if="row.id != 1">分配资源</n-button>-->
							<n-button quaternary size="small" type="primary" @click="editRole(row)">编辑</n-button>
							<n-popconfirm @positive-click="deleteRole(row)">
								<template #trigger>
									<n-button quaternary size="small" type="error">删除</n-button>
								</template>
								是否确定删除该角色吗?
							</n-popconfirm>
							<n-dropdown :options="moreOptions" trigger="click" @select="key => moreHandleSelect(key, row)">
								<n-button quaternary size="small" type="info">更多操作</n-button>
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
					style="display: flex; justify-content: right; margin-top: 5px"
					@update:page="onChange"
					@update:page-size="onUpdatePageSize"
				>
					<template #suffix> 共 {{ page.totalResult }} 条数据</template>
				</n-pagination>
			</n-card>
			<role-form ref="roleFormRef" :system-list="systemList" @ok="getTableData"></role-form>
			<allocate-resources ref="allocateResourcesRef" @ok="getTableData"></allocate-resources>
			<data-rules ref="dataRulesRef"></data-rules>
		</div>
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
import { dataScopeOptions } from "@/constant/system/role";

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
const { tableList, tableLoading, searchForm, page, onChange, onUpdatePageSize, getTableData, reset, resetTableList } =
	useTableData({
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

<style lang="less" scoped>
.search-card {
	::v-deep(.n-form-item-feedback-wrapper) {
		display: none;
	}
}
</style>

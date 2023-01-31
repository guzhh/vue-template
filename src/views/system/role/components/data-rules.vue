<template>
	<n-drawer v-model:show="active" resizable default-width="100%" :mask-closable="false" @after-leave="handleClose">
		<n-drawer-content title="数据规则设置" closable>
			<n-grid x-gap="12" :cols="5">
				<n-gi span="2">
					<n-card title="资源列表" size="small">
						<vxe-table
							resizable
							border
							row-id="id"
							align="center"
							:size="tableSize"
							:height="height - 40"
							ref="resourceTableRef"
							@current-change="currentChangeEvent"
							:row-config="{ keyField: 'id', useKey: true, isCurrent: true, isHover: true }"
							:tree-config="{ children: 'children', expandAll: true, reserve: true }"
							:data="resourceList"
						>
							<vxe-column tree-node field="name" title="资源名称" min-width="150px" show-overflow="title"></vxe-column>
							<vxe-column field="permissionFlag" title="权限标识" min-width="120px" show-overflow="title"></vxe-column>
							<vxe-column field="type" title="资源类型" min-width="80px" show-overflow="title">
								<template #default="{ row }">
									<option-badge :options="typeFlagOptions" :val="row.type" />
								</template>
							</vxe-column>
						</vxe-table>
					</n-card>
				</n-gi>
				<n-gi span="3">
					<n-card title="数据规则" size="small">
						<template #header-extra>
							<n-button size="small" quaternary type="primary" @click="addARule">添加规则</n-button>
						</template>
						<vxe-table
							border
							keep-source
							show-overflow
							:size="tableSize"
							align="center"
							:height="height - 40"
							:data="authRoleList"
							:column-config="{ resizable: true }"
							:edit-config="{ trigger: 'click', mode: 'cell', showStatus: true }"
						>
							<vxe-column type="seq" width="60"></vxe-column>
							<vxe-column
								field="name"
								title="规则名称"
								:edit-render="{ autofocus: '.vxe-input--inner', placeholder: '请点击输入规则名称...' }"
							>
								<template #edit="{ row }">
									<n-input v-model:value="row.name" placeholder="请输入规则名称" />
								</template>
							</vxe-column>
							<vxe-column
								field="ruleField"
								title="规则字段"
								:edit-render="{ autofocus: '.vxe-input--inner', placeholder: '请点击输入规则字段...' }"
							>
								<template #edit="{ row }">
									<n-input v-model:value="row.ruleField" placeholder="请输入规则字段" />
								</template>
							</vxe-column>
							<vxe-column
								field="ruleExpress"
								title="规则表达式"
								:edit-render="{ autofocus: '.vxe-input--inner', placeholder: '请点击输入规则表达式...' }"
							>
								<template #edit="{ row }">
									<n-input v-model:value="row.ruleExpress" placeholder="请输入规则表达式" />
								</template>
							</vxe-column>
							<vxe-column
								field="ruleVal"
								title="规则值"
								:edit-render="{ autofocus: '.vxe-input--inner', placeholder: '请点击输入规则值...' }"
							>
								<template #edit="{ row }">
									<n-input v-model:value="row.ruleVal" placeholder="请输入规则值" />
								</template>
							</vxe-column>
							<vxe-column field="state" title="规则状态">
								<template #default="{ row }">
									<n-switch v-model:value="row.state" :checked-value="1" :unchecked-value="0">
										<template #checked> 启用 </template>
										<template #unchecked> 禁用 </template>
									</n-switch>
								</template>
							</vxe-column>
							<vxe-column title="操作" width="120px" fixed="right">
								<template #default>
									<n-popconfirm>
										<template #trigger>
											<n-button type="error" quaternary size="small">删除</n-button>
										</template>
										是否确定删除该规则吗?
									</n-popconfirm>
									<n-button quaternary type="primary" size="small">保存</n-button>
								</template>
							</vxe-column>
						</vxe-table>
					</n-card>
				</n-gi>
			</n-grid>
		</n-drawer-content>
	</n-drawer>
</template>

<script setup>
import { ref } from "vue";
// import { useMessage } from "naive-ui";
import useTable from "@/hooks/useTable";
import { setTreeData } from "@/utils/tree";
import { getRoleAllRes, getRoleResRuleList } from "@/api/system/role";
import { useWindowSize } from "@/hooks/useWindowSize";
import { typeFlagOptions } from "@/constant/system/resource";

defineOptions({ name: "dataRules" });

// const message = useMessage();
const resourceTableRef = ref(null);
const { height } = useWindowSize();
const { tableSize } = useTable();
const active = ref(false); // 模态框关闭开启
const roleData = ref({}); // 当前选中的角色
const resourceData = ref({}); // 当前选中的资源
const resourceList = ref([]); // 角色拥有的资源列表
const authRoleList = ref([
	{
		id: 0,
		name: "规则名称",
		ruleField: "规则字段",
		ruleExpress: "规则表达式",
		ruleVal: "规则值",
		state: 1
	}
]); // 角色资源规则列表

const getAythRoleList = () => {
	getRoleResRuleList({});
};

const open = row => {
	active.value = true;
	roleData.value = row;
	getRoleAllRes({ roleId: row.id }).then(res => {
		if (res.success) {
			resourceList.value = setTreeData(res.result, "id", "pid");
			if (resourceList.value.length > 0) {
				resourceTableRef.value.setCurrentRow(resourceList.value[0]);
				[resourceData.value] = resourceList.value;
				getAythRoleList();
			}
		}
	});
};

// 切换资源
const currentChangeEvent = ({ row }) => {
	resourceData.value = row;
};

const handleClose = () => {
	active.value = false;
	roleData.value = {};
	resourceData.value = {};
};

// 添加规则
const addARule = () => {
	// const authRole = authRoleList.value.reduce((accumulator, currentValue, currentIndex) => {
	// 	if (!currentValue.id) {
	// 		return [...accumulator, currentIndex];
	// 	}
	// 	return accumulator;
	// }, []);
	// if (authRole.length > 0) {
	// 	message.warning(`当前第${authRole.join("、")}条规则未进行保存，请先保存在添加数据`);
	// }
};

defineExpose({ open });
</script>

<style scoped></style>

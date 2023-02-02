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
							ref="authRoleTableRef"
							:height="height - 40"
							:data="authRoleList"
							:column-config="{ resizable: true }"
							:edit-config="{ trigger: 'click', mode: 'cell', showStatus: true }"
						>
							<vxe-column type="seq" width="60"></vxe-column>
							<vxe-column
								field="name"
								title="规则名称"
								min-width="100"
								:edit-render="{ autofocus: '.vxe-input--inner', placeholder: '请点击输入规则名称...' }"
							>
								<template #edit="{ row }">
									<n-input v-model:value="row.name" placeholder="请输入规则名称" />
								</template>
							</vxe-column>
							<vxe-column
								field="ruleField"
								title="规则字段"
								min-width="100"
								:edit-render="{ autofocus: '.vxe-input--inner', placeholder: '请点击输入规则字段...' }"
							>
								<template #edit="{ row }">
									<n-input v-model:value="row.ruleField" placeholder="请输入规则字段" />
								</template>
							</vxe-column>
							<vxe-column
								field="ruleExpress"
								title="规则表达式"
								min-width="100"
								:edit-render="{ autofocus: '.vxe-input--inner', placeholder: '请点击输入规则表达式...' }"
							>
								<template #edit="{ row }">
									<n-input v-model:value="row.ruleExpress" placeholder="请输入规则表达式" />
								</template>
							</vxe-column>
							<vxe-column
								field="ruleVal"
								title="规则值"
								min-width="100"
								:edit-render="{ autofocus: '.vxe-input--inner', placeholder: '请点击输入规则值...' }"
							>
								<template #edit="{ row }">
									<n-input v-model:value="row.ruleVal" placeholder="请输入规则值" />
								</template>
							</vxe-column>
							<vxe-column field="state" title="规则状态" min-width="100">
								<template #default="{ row }">
									<n-switch
										v-model:value="row.state"
										:checked-value="1"
										:unchecked-value="0"
										@update:value="val => handleUpdateState(row, val)"
									>
										<template #checked> 启用</template>
										<template #unchecked> 禁用</template>
									</n-switch>
								</template>
							</vxe-column>
							<vxe-column title="操作" width="120px" fixed="right">
								<template #default="{ row }">
									<n-popconfirm @positive-click="delTheRule(row)">
										<template #trigger>
											<n-button type="error" quaternary size="small">删除</n-button>
										</template>
										是否确定删除该规则吗?
									</n-popconfirm>
									<n-button quaternary type="primary" size="small" @click="saveTheRule(row)">保存</n-button>
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
import { useDialog } from "naive-ui";
import useTable from "@/hooks/useTable";
import { setTreeData } from "@/utils/tree";
import { useWindowSize } from "@/hooks/useWindowSize";
import { typeFlagOptions } from "@/constant/system/resource";
import { delRoleResRule, getRoleAllRes, getRoleResRuleList, saveOrUptRoleResRule, uptRoleResRuleState } from "@/api/system/role";
import validator from "@/validator";
import { authRoleSchema } from "@/validator/system/role";

defineOptions({ name: "dataRules" });

const dialog = useDialog();
const authRoleTableRef = ref(null);
const resourceTableRef = ref(null);
const { height } = useWindowSize();
const { tableSize } = useTable();
const active = ref(false); // 模态框关闭开启
const roleData = ref({}); // 当前选中的角色
const resourceData = ref({}); // 当前选中的资源
const resourceList = ref([]); // 角色拥有的资源列表
const authRoleList = ref([]); // 角色资源规则列表

// 获取到角色资源规则
const getAythRoleList = () => {
	getRoleResRuleList({ roleId: roleData.value.id, resId: resourceData.value.id }).then(res => {
		if (res.success) {
			authRoleList.value = res.result;
		}
	});
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
	getAythRoleList();
};

// 关闭弹窗
const handleClose = () => {
	active.value = false;
	roleData.value = {};
	resourceData.value = {};
	authRoleList.value = [];
};

// 修改规则状态
const handleUpdateState = row => {
	if (row.id) {
		dialog.warning({
			title: "警告",
			content: `请问是否确认${row.state === 1 ? "启用" : "禁用"}${row.name}`,
			positiveText: "确定",
			negativeText: "不确定",
			onPositiveClick: () => {
				uptRoleResRuleState({ id: row.id, state: row.state });
			},
			onNegativeClick: () => {
				row.state = row.state === 1 ? 0 : 1;
			}
		});
	}
};

// 保存规则
const saveTheRule = row => {
	validator({ data: row, schema: authRoleSchema }).then(() => {
		saveOrUptRoleResRule(row).then(res => {
			if (res.success) {
				row.id = res.result;
			}
		});
	});
};

// 删除规则
const delTheRule = row => {
	if (!row.id) {
		authRoleTableRef.value.remove(row);
	} else {
		delRoleResRule({ id: row.id }).then(res => {
			if (res.success) {
				authRoleTableRef.value.remove(row);
			}
		});
	}
};

// 添加规则
const addARule = async () => {
	if (resourceData.value.id) {
		const record = {
			id: null,
			roleId: roleData.value.id,
			resId: resourceData.value.id,
			name: null,
			ruleField: null,
			ruleExpress: null,
			ruleVal: null,
			state: 0
		};
		await authRoleTableRef.value.insertAt(record);
	}
};

defineExpose({ open });
</script>

<style scoped></style>

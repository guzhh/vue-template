<template>
	<n-drawer v-model:show="active" resizable default-width="50%" :mask-closable="false" @after-leave="handleClose">
		<n-drawer-content title="分配资源" closable>
			<template #footer>
				<n-button type="primary" @click="saveRoleResBind">确认</n-button>
				<n-button style="margin-left: 10px" @click="handleClose">取消</n-button>
			</template>
			<vxe-table
				resizable
				border="inner"
				stripe
				row-id="id"
				ref="tableRef"
				:size="tableSize"
				:height="height - 60"
				:loading="tableLoading"
				style="margin-top: 10px"
				:row-config="{ isHover: true, isCurrent: true }"
				:checkbox-config="{ checkRowKeys: curCheckedRowIds, checkStrictly: true }"
				:tree-config="{
					children: 'children',
					expandAll: true,
					line: true,
					reserve: true,
					iconOpen: 'vxe-icon-square-minus',
					iconClose: 'vxe-icon-square-plus'
				}"
				:data="tableData"
			>
				<vxe-column align="center" type="checkbox" width="60"></vxe-column>
				<vxe-column tree-node field="name" title="资源名称" min-width="150px" show-overflow="title"></vxe-column>
				<vxe-column field="permissionFlag" title="权限标识" min-width="120px" show-overflow="title"></vxe-column>
				<vxe-column field="type" title="资源类型" min-width="80px" show-overflow="title">
					<template #default="{ row }">
						<option-badge :options="typeFlagOptions" :val="row.type" />
					</template>
				</vxe-column>
			</vxe-table>
		</n-drawer-content>
	</n-drawer>
</template>

<script setup>
import { ref } from "vue";
import { getResourceList } from "@/api/system/resource";
import { setTreeData } from "@/utils/tree";
import useTable from "@/hooks/useTable";
import { useWindowSize } from "@/hooks/useWindowSize";
import { roleResBind, getRoleAllRes } from "@/api/system/role";
import { typeFlagOptions } from "@/constant/system/resource";

defineOptions({ name: "allocate-resources" });

const emits = defineEmits(["ok"]);

const { height } = useWindowSize();
const { tableSize } = useTable();

const tableRef = ref();
const active = ref(false);
const tableData = ref([]);
const tableLoading = ref(false);
const curCheckedRowIds = ref([]);
const roles = ref({});

const open = row => {
	active.value = true;
	roles.value = { ...row };
	tableData.value = [];
	getRoleAllRes({ roleId: row.id })
		.then(res => {
			if (res.success) {
				curCheckedRowIds.value = res.result.map(item => item.id);
			}
		})
		.finally(() => {
			getResourceList({ sysId: row.sysId })
				.then(res => {
					if (res.success) {
						tableData.value = setTreeData(res.result, "id", "pid");
					}
				})
				.finally(() => {
					tableLoading.value = false;
				});
		});
};

const handleClose = () => {
	roles.value = {};
	tableLoading.value = false;
	tableData.value = [];
	active.value = false;
	curCheckedRowIds.value = [];
};

const saveRoleResBind = () => {
	const checkedRows = tableRef.value.getCheckboxRecords();
	// 获取半选中状态的行
	const halfCheckedRows = tableRef.value.getCheckboxIndeterminateRecords();
	const fullRows = [...checkedRows, ...halfCheckedRows];
	const rowIds = fullRows.map(r => {
		return r.id;
	});
	const rowIdsStr = rowIds.join(",");
	roleResBind({ resourceIds: rowIdsStr, roleId: roles.value.id }).then(res => {
		if (res.success) {
			handleClose();
			emits("ok");
		}
	});
};

defineExpose({ open });
</script>

<style scoped></style>

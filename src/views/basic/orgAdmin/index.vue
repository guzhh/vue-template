<template>
	<page-content>
		<n-card size="small" title="机构列表">
			<template #header>
				<n-select
					v-model:value="ifDel"
					clearable
					size="small"
					style="width: 150px"
					placeholder="是否删除"
					:options="[
						{ value: 0, label: '未删除' },
						{ value: 1, label: '已删除' }
					]"
					@update:value="getOrg"
				>
				</n-select>
			</template>
			<template #header-extra>
				<n-button v-action:addOrgButton size="small" type="primary" @click="addNewOrg({})">新增机构</n-button>
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
						<n-icon size="17" @click="getOrg">
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
				:data="tableData"
				:height="height - 90"
				:loading="tableLoading"
				:row-config="{
					keyField: 'code',
					isHover: true,
					isCurrent: true
				}"
				:size="tableSize"
				:tree-config="{
					transform: true,
					line: true,
					rowField: 'code',
					parentField: 'pcode',
					lazy: true,
					hasChild: 'hasChild',
					loadMethod: loadChildrenMethod,
					iconOpen: 'vxe-icon-square-minus',
					iconClose: 'vxe-icon-square-plus'
				}"
				align="center"
				border="none"
				resizable
				row-id="code"
				show-header-overflow="title"
				show-overflow
			>
				<vxe-column align="left" field="name" min-width="150px" show-overflow="title" title="机构名称" tree-node></vxe-column>
				<vxe-column field="code" min-width="120px" show-overflow="title" title="机构编码"></vxe-column>
				<vxe-column field="pcode" min-width="80px" show-overflow="title" title="上级机构编码"></vxe-column>
				<vxe-column field="descr" min-width="120px" show-overflow="title" title="机构描述"></vxe-column>
				<vxe-column field="ifDel" min-width="120px" show-overflow="title" title="是否删除">
					<template #default="{ row }">
						<option-badge :options="ifDeletedOption" :val="row.ifDel" />
					</template>
				</vxe-column>
				<vxe-column fixed="right" title="操作" width="240px">
					<template #default="{ row }">
						<n-button v-action:addOrgSub quaternary size="small" type="primary" @click="addNewOrg(row)">添加下级 </n-button>
						<n-button v-action:editOrgButton quaternary size="small" type="primary" @click="editOrg(row)">编辑 </n-button>
						<n-popconfirm v-if="row.ifDel === 0" @positive-click="deleteOrg(row)">
							<template #trigger>
								<n-button v-action:delOrgButton quaternary size="small" type="error">删除</n-button>
							</template>
							是否确定删除该机构吗?
						</n-popconfirm>
						<n-popconfirm v-if="row.ifDel === 1" @positive-click="recoverOrg(row)">
							<template #trigger>
								<n-button v-action:repealDelOrg quaternary size="small" type="info">撤销删除</n-button>
							</template>
							是否确定撤销删除?
						</n-popconfirm>
					</template>
				</vxe-column>
			</vxe-table>
			<create-form ref="orgCreateFormRef" @ok="saveSuccess"></create-form>
		</n-card>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useWindowSize } from "@/hooks/useWindowSize";
import useTable from "@/hooks/useTable";

import { getOrgList, delOrg, cancelDelOrg, getOrgInfoByCode } from "@/api/system/orgAdmin.js";
import { ifDeletedOption } from "@/constant/system/resource";
import CreateForm from "@/views/basic/orgAdmin/components/create-form.vue";

defineOptions({ name: "orgAdmin" });

const tableRef = ref();
const orgCreateFormRef = ref();
// eslint-disable-next-line no-unused-vars
const message = useMessage();
const { height } = useWindowSize();
const { tableSizeOptions, tableSize } = useTable();
const tableLoading = ref();
const tableData = ref([]);
const ifDel = ref(null);

// 获取机构列表
const getOrg = () => {
	tableLoading.value = true;
	getOrgInfoByCode({ orgCode: null, ifDel: ifDel.value })
		.then(res => {
			if (res.success) {
				tableData.value = res.result.map(item => {
					return { ...item, hasChild: true };
				});
			}
		})
		.finally(() => {
			tableLoading.value = false;
			const $table = tableRef.value;
			$table.clearTreeExpand();
		});
};
getOrg();

// 新增机构
const addNewOrg = row => {
	console.log("新增机构");
	orgCreateFormRef.value.add(row);
};

// 编辑机构信息
// eslint-disable-next-line no-unused-vars
const editOrg = row => {
	console.log(row, "编辑机构信息");
	orgCreateFormRef.value.edit(row);
};

// 删除机构
// eslint-disable-next-line no-unused-vars
const deleteOrg = row => {
	console.log(row, "删除机构");
	delOrg({ id: row.id }).then(res => {
		if (res.success) {
			message.success("删除成功");
			const $table = tableRef.value;
			const data = $table.getRowById(row.pcode);
			if (data?.id) {
				$table.reloadTreeExpand(data);
			} else {
				getOrg();
			}
		}
	});
};

// 撤销删除
// eslint-disable-next-line no-unused-vars
const recoverOrg = row => {
	console.log(row, "撤销删除");
	cancelDelOrg({ id: row.id }).then(res => {
		if (res.success) {
			message.success("撤销成功");
			const $table = tableRef.value;
			const data = $table.getRowById(row.pcode);
			if (data?.id) {
				$table.reloadTreeExpand(data);
			} else {
				getOrg();
			}
		}
	});
};

// 点击一级加载二级
const loadChildrenMethod = ({ row }) => {
	return new Promise(resolve => {
		getOrgList({ pcode: row.code, ifDel: ifDel.value }).then(res => {
			if (res.success && res.result.length > 0) {
				// eslint-disable-next-line no-param-reassign
				res.result = res.result.map(item => {
					return { ...item, hasChild: true };
				});
				resolve(res.result);
			} else {
				// eslint-disable-next-line no-param-reassign
				row.hasChild = false;
				message.warning("当前机构不存在下级机构");
				resolve([]);
			}
		});
	});
};

// 保存成功
const saveSuccess = (data, isEdit) => {
	if (isEdit) {
		const $table = tableRef.value;
		const Pdata = $table.getRowById(data.pcode);
		if (Pdata?.id) {
			$table.reloadTreeExpand(Pdata);
		} else {
			getOrg();
		}
	} else if (!data.id) {
		// 新增机构后重新获取机构列表
		getOrg();
	} else {
		// eslint-disable-next-line no-param-reassign
		data.hasChild = true;
		// 添加下级机构重新加载子机构
		const $table = tableRef.value;
		$table.reloadTreeExpand(data);
	}
};
</script>

<style scoped></style>

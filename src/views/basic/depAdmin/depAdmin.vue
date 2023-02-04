<template>
	<page-content>
		<div style="display: flex; justify-content: space-between">
			<n-card size="small" style="width: 200px" title="机构列表:">
				<n-tree
					:cancelable="false"
					:data="treeData"
					:render-label="treeRenderLabel"
					:default-selected-keys="defaultSelect"
					:on-load="handleLoad"
					block-line
					@update-selected-keys="select"
				/>
			</n-card>
			<n-card size="small" title="科室列表" style="margin-left: 5px">
				<template #header-extra>
					<n-button v-action:addDeptButton size="small" type="primary" @click="addNewDep({})">新增科室</n-button>
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
					ref="tableRef"
					:data="tableData"
					:height="height - 85"
					:loading="tableLoading"
					:row-config="{
						keyField: 'code'
					}"
					:size="tableSize"
					:tree-config="{
						transform: true,
						rowField: 'code',
						parentField: 'pcode',
						lazy: true,
						hasChild: 'hasChild',
						loadMethod: loadChildrenMethod
					}"
					align="center"
					border="inner"
					resizable
					row-id="code"
					show-header-overflow="title"
					show-overflow
				>
					<vxe-column field="name" min-width="150px" show-overflow="title" title="科室名称" tree-node></vxe-column>
					<vxe-column field="code" min-width="120px" show-overflow="title" title="科室编码"></vxe-column>
					<vxe-column field="pcode" min-width="80px" show-overflow="title" title="上级科室编码"></vxe-column>
					<vxe-column field="outCode" min-width="80px" show-overflow="title" title="三方科室编码"></vxe-column>
					<vxe-column field="descr" min-width="120px" show-overflow="title" title="科室介绍"></vxe-column>
					<vxe-column field="ifDel" min-width="120px" show-overflow="title" title="是否删除">
						<template #default="{ row }">
							<option-badge :options="ifDeletedOption" :val="row.ifDel" />
						</template>
					</vxe-column>
					<vxe-column fixed="right" title="操作" width="240px">
						<template #default="{ row }">
							<n-button quaternary size="small" type="primary" @click="addNewDep(row)">添加下级</n-button>
							<n-button quaternary size="small" type="primary" @click="editDep(row)">编辑</n-button>
							<n-popconfirm v-if="row.ifDel === 0" @positive-click="deleteDep(row)">
								<template #trigger>
									<n-button quaternary size="small" type="error">删除</n-button>
								</template>
								是否确定删除该科室吗?
							</n-popconfirm>
							<n-popconfirm v-if="row.ifDel === 1" @positive-click="recoverDep(row)">
								<template #trigger>
									<n-button quaternary size="small" type="info">撤销删除</n-button>
								</template>
								是否确定撤销删除?
							</n-popconfirm>
						</template>
					</vxe-column>
					<template #empty>
						<n-empty description="暂无数据"></n-empty>
					</template>
				</vxe-table>
				<create-form ref="depCreateFormRef" @ok="saveSuccess"></create-form>
			</n-card>
		</div>
	</page-content>
</template>

<script setup>
import { h, ref } from "vue";
import { useMessage } from "naive-ui";
import { useWindowSize } from "@/hooks/useWindowSize";
import useTable from "@/hooks/useTable";
import { getOrgList } from "@/api/system/orgAdmin.js";
import { ifDeletedOption } from "@/constant/system/resource";
import CreateForm from "@/views/basic/depAdmin/modules/createForm.vue";
import { getDeptList, delDept, cancelDelDept } from "@/api/system/depAdmin.js";

defineOptions({ name: "depAdmin" });

const tableRef = ref();
const depCreateFormRef = ref();
// eslint-disable-next-line no-unused-vars
const message = useMessage();
const { height } = useWindowSize();
const { tableSizeOptions, tableSize } = useTable();
const tableLoading = ref(false);
const tableData = ref([]);
const treeData = ref([]);
const defaultSelect = ref([]);
const orgCode = ref("");

const treeRenderLabel = ({ option }) => {
	// display: block; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;
	return h(
		"span",
		{
			style: {
				display: "block",
				overflow: "hidden",
				whiteSpace: "nowrap",
				textOverflow: "ellipsis"
			},
			title: option.label
		},
		option.label
	);
};

// 获取科室列表
const getDepartList = () => {
	tableLoading.value = true;
	getDeptList({ pcode: "", orgCode: orgCode.value })
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

// 获取机构列表
const getOrg = () => {
	getOrgList({ pcode: "" }).then(res => {
		if (res.success) {
			treeData.value = res.result.map(item => {
				return { ...item, key: item.code, label: item.name, isLeaf: false };
			});
			if (treeData.value[0]?.key) {
				defaultSelect.value.push(treeData.value[0]?.key);
				orgCode.value = treeData.value[0]?.key;
				getDepartList();
			}
		}
	});
};
getOrg();

// 新增科室
const addNewDep = row => {
	depCreateFormRef.value.add({ row, orgCode: orgCode.value });
};

// 编辑科室信息
// eslint-disable-next-line no-unused-vars
const editDep = row => {
	depCreateFormRef.value.edit(row);
};

// 删除科室
const deleteDep = row => {
	delDept({ id: row.id }).then(res => {
		if (res.success) {
			const $table = tableRef.value;
			const data = $table.getRowById(row.pcode);
			if (data?.id) {
				$table.reloadTreeExpand(data);
			} else {
				getDepartList();
			}
		}
	});
};

// 撤销删除
// eslint-disable-next-line no-unused-vars
const recoverDep = row => {
	cancelDelDept({ id: row.id }).then(res => {
		if (res.success) {
			const $table = tableRef.value;
			const data = $table.getRowById(row.pcode);
			if (data?.id) {
				$table.reloadTreeExpand(data);
			} else {
				getDepartList();
			}
		}
	});
};

// 点击一级加载二级
const loadChildrenMethod = ({ row }) => {
	return new Promise(resolve => {
		getDeptList({ pcode: row.code, orgCode: orgCode.value }).then(res => {
			if (res.success && res.result.length > 0) {
				// eslint-disable-next-line no-param-reassign
				res.result = res.result.map(item => {
					return { ...item, hasChild: true };
				});
				resolve(res.result);
			} else {
				// eslint-disable-next-line no-param-reassign
				row.hasChild = false;
				message.warning("当前科室不存在下级科室");
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
			getDepartList();
		}
	} else if (!data.id) {
		// 新增科室后重新获取科室列表
		getDepartList();
	} else {
		// eslint-disable-next-line no-param-reassign
		data.hasChild = true;
		// 添加下级机构重新加载子机构
		const $table = tableRef.value;
		$table.reloadTreeExpand(data);
	}
};

const handleLoad = node => {
	return new Promise(resolve => {
		getOrgList({ pcode: node.code })
			.then(res => {
				if (res.success) {
					if (res.result.length <= 0) {
						// eslint-disable-next-line no-param-reassign
						node.isLeaf = true;
					} else {
						// eslint-disable-next-line no-param-reassign
						node.children = res.result.map(item => {
							return { ...item, key: item.code, label: item.name, isLeaf: false };
						});
					}
				}
			})
			.finally(() => {
				resolve();
			});
	});
};

// 选中机构
// eslint-disable-next-line no-unused-vars
const select = (keys, option) => {
	if (keys.length > 0) {
		// eslint-disable-next-line prefer-destructuring
		orgCode.value = keys[0];
		getDepartList();
	}
};
</script>

<style scoped></style>

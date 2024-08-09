<template>
	<page-content :style="{ height: height + 'px' }">
		<div style="display: flex; justify-content: space-between; height: 100%">
			<n-card
				size="small"
				style="width: 200px; flex-shrink: 0"
				title="机构列表"
				:segmented="{
					content: true
				}"
				:content-style="{ overflow: 'auto' }"
			>
				<n-tree
					show-line
					:cancelable="false"
					:data="treeData"
					:default-selected-keys="defaultSelect"
					:on-load="handleLoad"
					:render-label="treeRenderLabel"
					block-line
					@update-selected-keys="select"
				/>
			</n-card>
			<n-card size="small" style="margin-left: 5px; width: calc(100% - 210px)">
				<template #header>
					<n-space>
						<n-select
							v-model:value="ifDel"
							clearable
							style="width: 150px"
							placeholder="是否已删除"
							:options="[
								{ value: 0, label: '未删除' },
								{ value: 1, label: '已删除' }
							]"
							@update:value="getDepartList"
						>
						</n-select>
						<n-input placeholder="科室名称\拼音码" v-model:value="deptName" @keydown.enter="getDepartList" clearable> </n-input>
						<n-button type="primary" @click="getDepartList">查询</n-button>
						<n-button @click="resetQuery">重置</n-button>
					</n-space>
				</template>
				<template #header-extra>
					<n-button style="margin-right: 15px" v-action:addDeptButton type="primary" @click="addNewDep({})">新增科室 </n-button>

					<n-tooltip>
						<span>上传科室excel文件</span>
						<template #trigger>
							<n-icon size="17" @click="importDataEvent">
								<Upload />
							</n-icon>
						</template>
					</n-tooltip>
					<n-divider vertical />
					<n-tooltip>
						<span>科室信息模板下载</span>
						<template #trigger>
							<n-icon size="17" @click="exportDataEvent">
								<Download />
							</n-icon>
						</template>
					</n-tooltip>
					<n-divider vertical />
					<n-tooltip>
						<span>折叠</span>
						<template #trigger>
							<n-icon size="17" @click="$refs.tableRef.clearTreeExpand()">
								<ArrowBetweenDown24Filled />
							</n-icon>
						</template>
					</n-tooltip>
					<n-divider vertical />
					<n-tooltip>
						<span>刷新</span>
						<template #trigger>
							<n-icon size="17" @click="getDepartList">
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
						useKey: true,
						keyField: 'code',
						isHover: true,
						isCurrent: true
					}"
					:size="tableSize"
					:tree-config="{
						transform: true,
						showLine: true,
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
					<vxe-column field="name" align="left" min-width="150px" show-overflow="title" title="科室名称" tree-node></vxe-column>
					<vxe-column field="piny" min-width="100" show-overflow="title" title="拼音码"></vxe-column>
					<vxe-column field="code" min-width="120" show-overflow="title" title="科室编码"></vxe-column>
					<vxe-column field="pcode" min-width="120" show-overflow="title" title="上级科室编码"></vxe-column>
					<vxe-column field="outCode" min-width="120" show-overflow="title" title="三方科室编码"></vxe-column>
					<vxe-column field="nmsDeptCode" min-width="100" show-overflow="title" title="医保编码"></vxe-column>
					<vxe-column field="nmsDeptName" min-width="120" show-overflow="title" title="医保名称"></vxe-column>
					<vxe-column field="deptType" min-width="100" show-overflow="title" title="科室类型">
						<template #default="{ row }">
							<dict-code-show pcode="DEPT_TYPE" :dict-code="row.deptType"></dict-code-show>
						</template>
					</vxe-column>
					<vxe-column field="descr" min-width="120" show-overflow="title" title="科室介绍"></vxe-column>
					<vxe-column field="deptmentPeoples" min-width="80" show-overflow="title" title="用户数">
						<template #default="{ row }">
							<n-tag size="small" type="primary" @click="viewUsers(row)">
								<n-icon :component="UserOutlined" />
								<span style="font-size: 16px; margin-left: 5px">{{ row.deptmentPeoples }}</span>
							</n-tag>
						</template>
					</vxe-column>
					<vxe-column field="ifDel" min-width="120px" show-overflow="title" title="是否删除">
						<template #default="{ row }">
							<option-badge :options="ifDeletedOption" :val="row.ifDel" />
						</template>
					</vxe-column>
					<vxe-column field="sortNum" min-width="80px" show-overflow="title" title="排序号"></vxe-column>
					<vxe-column fixed="right" title="操作" width="240px">
						<template #default="{ row }">
							<n-button v-action:addDeptSub quaternary size="small" type="primary" @click="addNewDep(row)">添加下级 </n-button>
							<n-button v-action:editDeptButton quaternary size="small" type="primary" @click="editDep(row)">编辑 </n-button>
							<n-popconfirm v-if="row.ifDel === 0" @positive-click="deleteDep(row)">
								<template #trigger>
									<n-button v-action:delDeptButton quaternary size="small" type="error">删除</n-button>
								</template>
								是否确定删除该科室吗?
							</n-popconfirm>
							<n-popconfirm v-if="row.ifDel === 1" @positive-click="recoverDep(row)">
								<template #trigger>
									<n-button v-action:repealDelDept quaternary size="small" type="info">撤销删除</n-button>
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
				<dept-users ref="deptUsersRef" />
			</n-card>
		</div>
	</page-content>
</template>

<script setup>
import { h, ref } from "vue";
import { useMessage } from "naive-ui";
import { UserOutlined } from "@vicons/antd";
import { useWindowSize } from "@/hooks/useWindowSize";
import useTable from "@/hooks/useTable";
import { getOrgList, getOrgInfoByCode } from "@/api/system/orgAdmin.js";
import { ifDeletedOption } from "@/constant/system/resource";
import CreateForm from "@/views/basic/depAdmin/components/create-form.vue";
import { getDeptList, delDept, cancelDelDept, downLoadTemplate, uploaDeptInfo } from "@/api/system/depAdmin.js";
import { convertToTreeArray } from "@/utils/tree";
import deptUsers from "./components/deptUsers.vue";
import file from "@/utils/file";

defineOptions({ name: "depAdmin" });

const deptUsersRef = ref();
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
const ifDel = ref(0); // 是否删除
const deptName = ref(""); // 科室名称

const exportDataEvent = () => {
	// 导出科室模板
	downLoadTemplate().then(data => {
		// 截取文件名，这里是后端返回了文件名+后缀，如果没有可以自己拼接
		const fileName = decodeURI("科室导入模板.xlsx");
		// 将`blob`对象转化成一个可访问的`url`
		const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement("a");
		link.style.display = "none";
		link.href = url;
		link.setAttribute("download", fileName);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	});
};

const viewUsers = row => {
	deptUsersRef.value.open(row);
};

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
	getDeptList({ pcode: "", orgCode: orgCode.value, ifDel: ifDel.value, deptName: deptName.value })
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
	getOrgInfoByCode({ orgCode: null, ifDel: 0 }).then(res => {
		if (res.success) {
			treeData.value = res.result.map(item => {
				return { ...item, key: item.code, label: item.name };
			});
			treeData.value = convertToTreeArray(treeData.value);
			if (treeData.value.length > 0) {
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

const importDataEvent = () => {
	// 导入科室
	file({ accept: ".xlsx,.xls", number: 1 }).then(files => {
		uploaDeptInfo({ file: files[0] }).then(res => {
			console.log("导入结果：{}", res.result);
			if (res.success) {
				getDepartList();
			}
		});
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
		getDeptList({ pcode: row.code, orgCode: orgCode.value, ifDel: ifDel.value }).then(res => {
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

// 重置查询条件
const resetQuery = () => {
	ifDel.value = 0;
	deptName.value = "";
	getDepartList();
};
</script>

<style scoped>
::v-deep(.n-tree .n-tree-node) {
	padding: 7px 5px 2px 0;
}
</style>

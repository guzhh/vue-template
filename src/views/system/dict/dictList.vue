<template>
	<n-card :content-style="{ height: windowSize.height.value - 10 + 'px', width: '100%', padding: '15px' }">
		<div style="display: flex; justify-content: flex-end; margin-bottom: 10px">
			<n-button type="primary" @click="addDict"> 新增</n-button>
		</div>
		<div :style="{ height: windowSize.height.value - 80 + 'px' }">
			<vxe-table
				:data="tableData"
				:loading="tableLoading"
				:tree-config="{
					transform: true,
					rowField: 'id',
					parentField: 'pid',
					lazy: true,
					hasChild: 'hasChild',
					loadMethod: loadChildrenMethod
				}"
				align="center"
				border="inner"
				height="100%"
				resizable
				row-id="code"
				show-header-overflow="title"
				show-overflow
				size="small"
			>
				<vxe-column field="id" show-overflow="title" title="字典id" tree-node width="80px"></vxe-column>
				<vxe-column field="pid" show-overflow="title" title="上级字典id" width="150px"></vxe-column>
				<vxe-column field="code" min-width="100px" show-overflow="title" title="字典编码"></vxe-column>
				<vxe-column field="name" min-width="100px" show-overflow="title" title="字典名称"></vxe-column>
				<vxe-column field="dictVal" min-width="200px" show-overflow="title" title="字典值"></vxe-column>
				<vxe-column field="state" min-width="100px" show-overflow="title" title="字典状态">
					<template #default="{ row }">
						<n-tag v-if="row.state === 0" type="error">禁用</n-tag>
						<n-tag v-else-if="row.state === 1" type="success">启用</n-tag>
					</template>
				</vxe-column>
				<vxe-column title="操作" width="200px">
					<template #default="{ row }">
						<n-button v-if="row.pid === 0" quaternary size="small" type="info" @click="addDict(row.id)">添加下级 </n-button>
						<n-button style="margin-right: 10px" text type="primary" @click="editParam(row)"> 编辑</n-button>
						<n-popconfirm @positive-click="deleteDict(row)">
							<template #trigger>
								<n-button text type="error"> 删除</n-button>
							</template>
							确定要删除该字典吗？
						</n-popconfirm>
					</template>
				</vxe-column>
			</vxe-table>
		</div>
		<create-form ref="createFormRef" @ok="getTableData"></create-form>
	</n-card>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useWindowSize } from "@/hooks/useWindowSize";
// eslint-disable-next-line no-unused-vars
import { getDictList, getDictByPids, delDict } from "@/api/system/dictList";
import CreateForm from "@/views/system/dict/modules/createForm.vue";

const message = useMessage();
const createFormRef = ref();
const windowSize = useWindowSize();
const tableData = ref([]);
const tableLoading = ref(false);

// 新增
const addDict = pid => {
	createFormRef.value.add(pid);
};

// 编辑字典
const editParam = row => {
	createFormRef.value.edit(row);
};

// 查询
const getTableData = () => {
	tableLoading.value = true;
	tableData.value = [];
	// 加载顶级节点
	getDictList({ pid: 0 })
		.then(res => {
			if (res.success) {
				tableData.value = res.result.map(item => {
					return { ...item, hasChild: true };
				});
				console.log(tableData.value, "tableData.value");
			}
		})
		.finally(() => {
			tableLoading.value = false;
		});
};

// 点击一级加载二级
const loadChildrenMethod = ({ row }) => {
	return new Promise(resolve => {
		getDictList({ pid: row.id }).then(res => {
			if (res.success && res.result.length > 0) {
				resolve(res.result);
			} else {
				// eslint-disable-next-line no-param-reassign
				row.hasChild = false;
				message.warning("当前字典没有下级字典");
				resolve([]);
			}
		});
	});
};

// 删除字典
const deleteDict = row => {
	delDict({ id: row.id }).then(res => {
		if (res.success) {
			message.success("字典删除成功");
			getTableData();
		}
	});
};
getTableData();
</script>

<style scoped></style>

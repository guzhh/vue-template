<!--
  文件描述：
  创建时间：2024/1/15 9:16
  创建人：gzh
-->
<template>
	<base-modal style="width: 780px" title="用户所在科室" v-model:show="visible" @close="handleClose" :footer="null">
		<vxe-table
			:data="deptList"
			max-height="900"
			size="mini"
			align="center"
			border="none"
			resizable
			stripe
			row-id="id"
			show-header-overflow="title"
			show-overflow
		>
			<vxe-column field="name" min-width="100px" show-overflow="title" title="科室名称" tree-node></vxe-column>
			<vxe-column field="piny" min-width="100px" show-overflow="title" title="拼音码"></vxe-column>
			<vxe-column field="code" min-width="120px" show-overflow="title" title="科室编码"></vxe-column>
			<vxe-column field="pcode" min-width="100px" show-overflow="title" title="上级科室编码"></vxe-column>
			<vxe-column field="outCode" min-width="100px" show-overflow="title" title="三方科室编码"></vxe-column>
			<vxe-column field="deptType" min-width="100px" show-overflow="title" title="科室类型">
				<template #default="{ row }">
					<dict-code-show pcode="DEPT_TYPE" :dict-code="row.deptType"></dict-code-show>
				</template>
			</vxe-column>
			<vxe-column title="操作" width="100px">
				<template #default="{ row, rowIndex }">
					<n-popconfirm @positive-click="deleteUser(row, rowIndex)">
						<template #trigger>
							<n-button text type="error"> 退出科室</n-button>
						</template>
						确定要从当前科室删除退出吗？
					</n-popconfirm>
				</template>
			</vxe-column>
		</vxe-table>
	</base-modal>
</template>

<script setup>
import { unbindDeptUser } from "@/api/users/user";

defineOptions({ name: "deptUsers" });
const visible = ref(false);
const deptList = ref([]);
const userInfo = ref(null);

const handleClose = () => {
	visible.value = false;
};

const open = row => {
	visible.value = true;
	deptList.value = row.deptList;
	userInfo.value = row;
};

const deleteUser = (row, rowIndex) => {
	unbindDeptUser({ account: userInfo.value.account, deptCode: row.code, orgCode: row.orgCode }).then(res => {
		if (res.success) {
			deptList.value.splice(rowIndex, 1);
		}
	});
};

defineExpose({ open });
</script>

<style scoped></style>

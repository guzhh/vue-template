<!--
  文件描述：
  创建时间：2024/1/15 9:16
  创建人：gzh
-->
<template>
	<base-modal style="width: 780px" title="科室下用户" v-model:show="visible" @close="handleClose" :footer="null">
		<!--		<n-form :model="searchForm" inline label-placement="left" label-width="auto" class="search-card">-->
		<!--			<n-form-item :show-label="false">-->
		<!--				-->
		<!--			</n-form-item>-->
		<!--			<n-form-item>-->
		<!--				-->
		<!--			</n-form-item>-->
		<!--		</n-form>-->
		<div style="display: flex; margin-bottom: 10px">
			<n-input
				style="width: 300px; margin-right: 10px"
				v-model:value="searchForm.queryStr"
				placeholder="请输入姓名/账号/拼音码"
				@keydown.enter="getData"
				clearable
				size="small"
			/>
			<n-button type="primary" size="small" @click="getData">查询</n-button>
		</div>
		<vxe-table
			:data="userList"
			max-height="800"
			:loading="tabaleLoading"
			size="mini"
			align="center"
			border="none"
			resizable
			stripe
			row-id="id"
			show-header-overflow="title"
			show-overflow
		>
			<vxe-column type="seq" width="60" title="序号"></vxe-column>
			<vxe-column field="name" min-width="100" show-overflow="title" title="姓名"></vxe-column>
			<vxe-column field="piny" min-width="80" show-overflow="title" title="拼音码"></vxe-column>
			<vxe-column field="account" min-width="100" show-overflow="title" title="账号"></vxe-column>
			<vxe-column field="departName" min-width="100" show-overflow="title" title="科室"></vxe-column>
			<vxe-column field="departCode" min-width="100" show-overflow="title" title="科室编码"></vxe-column>
			<vxe-column title="操作" width="150px">
				<template #default="{ row }">
					<n-popconfirm @positive-click="deleteUser(row)">
						<template #trigger>
							<n-button text type="error"> 删除</n-button>
						</template>
						确定要从当前科室删除该用户吗？
					</n-popconfirm>
				</template>
			</vxe-column>
		</vxe-table>
	</base-modal>
</template>

<script setup>
import { getUserAndDeptByUserType, unbindDeptUser } from "@/api/users/user";

defineOptions({ name: "deptUsers" });
const tabaleLoading = ref(false);
const visible = ref(false);
const userList = ref([]);
const dept = ref(null);

const defaultValue = {
	queryStr: null,
	orgCode: null,
	departCode: null
};
const searchForm = ref({ ...defaultValue });

const handleClose = () => {
	visible.value = false;
	searchForm.value = { ...defaultValue };
};

const getData = () => {
	tabaleLoading.value = true;
	searchForm.value = { ...searchForm.value, orgCode: dept.value.orgCode, departCode: dept.value.code };
	getUserAndDeptByUserType(searchForm.value)
		.then(res => {
			if (res.success) {
				userList.value = res.result;
			} else {
				userList.value = [];
			}
		})
		.catch(() => {
			userList.value = [];
		})
		.finally(() => {
			tabaleLoading.value = false;
		});
};

const deleteUser = row => {
	unbindDeptUser({ account: row.account, deptCode: row.departCode, orgCode: row.orgCode }).then(res => {
		if (res.success) {
			getData();
		}
	});
};

const open = row => {
	visible.value = true;
	dept.value = row;
	getData(row);
};

defineExpose({ open });
</script>

<style scoped></style>

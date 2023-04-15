<template>
	<n-modal v-model:show="showModal" style="position: fixed; top: 150px; left: 50%; transform: translate(-50%, 0)">
		<n-card style="width: 600px" :bordered="false" size="huge" role="dialog" aria-modal="true">
			<n-input-group>
				<n-select
					value-field="code"
					label-field="name"
					v-model:value="deptCode"
					placeholder="请选择当前所在科室"
					:options="deptOptions"
				/>
				<n-button type="primary" @click="confirmDept"> 确定</n-button>
			</n-input-group>
		</n-card>
	</n-modal>
</template>

<script setup>
import { ref } from "vue";
import useUserStore from "@/store/modules/user";
import { changeDept, getDeptByAccount } from "@/api/users/user";

const showModal = ref(false);
const deptCode = ref(null);
const userStore = useUserStore();

const deptOptions = ref([]);

const handleDept = () => {
	showModal.value = true;
};

getDeptByAccount({ account: userStore.userInfo.account }).then(res => {
	if (res.success) {
		deptOptions.value = res.result;
	}
});

const confirmDept = () => {
	if (deptCode.value) {
		changeDept({ deptCode: deptCode.value }).then(res => {
			if (res.success) {
				const dept = deptOptions.value.find(item => item.code === deptCode.value);
				userStore.setDepart({ departCode: dept.code, departName: dept.name });
				showModal.value = false;
			}
		});
	} else {
		window.$message.warning("请选择科室");
	}
};

defineExpose({ handleDept });
</script>

<style scoped></style>

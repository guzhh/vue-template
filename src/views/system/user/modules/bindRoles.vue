<template>
	<n-drawer v-model:show="active" :mask-closable="false" :width="800" placement="right" @after-leave="handleClose">
		<n-drawer-content closable title="分配角色">
			<n-checkbox-group v-model:value="roles">
				<n-grid v-for="(item, index) in allRoles" :key="index" :cols="4" :x-gap="12" :y-gap="8" class="girdItem">
					<n-gi :span="4" :style="{ color: themeColor }" class="itemTitle">{{ item.sysName }}</n-gi>
					<n-gi v-for="val in item.roleList" :key="val.id">
						<n-checkbox :label="val.name" :value="val.id + ',' + val.name" />
					</n-gi>
				</n-grid>
			</n-checkbox-group>
			<template #footer>
				<n-button size="small" style="margin-right: 10px" type="primary" @click="handleOk">确定</n-button>
				<n-button size="small" @click="handleClose">取消</n-button>
			</template>
		</n-drawer-content>
	</n-drawer>
</template>

<script setup>
import { computed, ref } from "vue";
import { useMessage } from "naive-ui";
import { getRoleAllList, setUserRole, getUserRoleAll } from "@/api/system/user.js";
import { useAppStore } from "@/store";

const active = ref(false);
const roles = ref([]);
const message = useMessage();
const allRoles = ref([]);
const appStore = useAppStore();
const themeColor = computed(() => appStore.themeColor);
const formValue = ref({
	userId: null,
	roleIds: "",
	roleNames: ""
});
// 打开抽屉
const open = data => {
	formValue.value.userId = data.id;
	getUserRoleAll({ userId: data.id })
		.then(res => {
			if (res.success) {
				res.result.forEach(item => {
					roles.value.push(`${item.roleId},${item.roleName}`);
				});
			}
		})
		.finally(() => {
			active.value = true;
		});
};

// 关闭抽屉
const handleClose = () => {
	active.value = false;
	formValue.value = {
		userId: null,
		roleIds: "",
		roleNames: ""
	};
	roles.value = [];
};

// 获取角色集合
const getRoles = () => {
	getRoleAllList().then(res => {
		if (res.success) {
			console.log(res.result);
			allRoles.value = res.result;
		}
	});
};

const handleOk = () => {
	console.log(roles.value);
	const arrayId = [];
	const arrayName = [];
	roles.value.forEach(item => {
		arrayId.push(item.split(",")[0]);
		arrayName.push(item.split(",")[1]);
	});
	formValue.value.roleIds = arrayId.join(",");
	formValue.value.roleNames = arrayName.join(",");
	setUserRole({ ...formValue.value }).then(res => {
		if (res.success) {
			message.success("角色分配成功");
			handleClose();
		}
	});
};
getRoles();
defineExpose({ open });
</script>

<style lang="scss" scoped>
.girdItem {
	padding-bottom: 20px;
	margin-bottom: 10px;
	border-bottom: 1px solid #ccc;

	.itemTitle {
		color: #51a7ff;
		font-size: 16px;
	}
}
</style>

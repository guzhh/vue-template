<template>
	<n-modal v-model:show="showModal" style="position: fixed; top: 150px; left: 50%; transform: translate(-50%, 0)">
		<n-card style="width: 600px" :bordered="false" size="huge" role="dialog" aria-modal="true">
			<n-input-group>
				<n-tree-select
					label-field="name"
					key-field="code"
					v-model:value="orgCode"
					:options="orgOptions"
					placeholder="请选择当前默认机构"
				/>
				<n-button type="primary" @click="confirmOrg"> 确定 </n-button>
			</n-input-group>
		</n-card>
	</n-modal>
</template>

<script setup>
import { ref } from "vue";
import { getOrgInfoByCode } from "@/api/system/orgAdmin";
import useUserStore from "@/store/modules/user";
import { convertToTreeArray, resolveTree } from "@/utils/tree";

const showModal = ref(false);
const orgCode = ref(null);
const userStore = useUserStore();

const orgOptions = ref([]);

const handleOrg = () => {
	showModal.value = true;
};

getOrgInfoByCode({ orgCode: null, ifDel: 0 }).then(res => {
	if (res.success) {
		orgOptions.value = convertToTreeArray(res.result, "code", "pcode");
	}
});

// const handleLoad = option => {
// 	return new Promise(resolve => {
// 		getOrgList({ pcode: option.code })
// 			.then(res => {
// 				if (res.success) {
// 					// eslint-disable-next-line no-param-reassign
// 					option.children = res.result.map(item => {
// 						return { ...item, isLeaf: false };
// 					});
// 				}
// 			})
// 			.finally(() => {
// 				resolve();
// 			});
// 	});
// };

const confirmOrg = () => {
	// console.log("orgOptions", orgOptions.value, orgCode.value);
	// 将树形数据解构为线性数据
	const list = resolveTree(orgOptions.value, "children");
	const org = list.find(item => orgCode.value === item.code);
	userStore.toggleCurrentOrgCode(org);
	showModal.value = false;
};

defineExpose({ handleOrg });
</script>

<style scoped></style>

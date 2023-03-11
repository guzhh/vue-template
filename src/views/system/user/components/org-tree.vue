<template>
	<n-card
		size="small"
		style="width: 200px"
		title="机构列表"
		:segmented="{
			content: true
		}"
	>
		<n-tree
			:cancelable="false"
			:data="treeData"
			:default-selected-keys="defaultSelect"
			:on-load="handleLoad"
			:render-label="treeRenderLabel"
			block-line
			@update-selected-keys="select"
		/>
	</n-card>
</template>

<script setup>
import { h, ref } from "vue";
import { getOrgList, getOrgInfoByCode } from "@/api/system/orgAdmin";
import useUserStore from "@/store/modules/user/index.js";

const treeData = ref([]);
const defaultSelect = ref([]);
const emits = defineEmits(["selectOrg"]);
const userStore = useUserStore();

const treeRenderLabel = ({ option }) => {
	return h("span", { style: "display: block; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;" }, option.label);
};

// 获取机构列表
const getOrg = () => {
	getOrgInfoByCode({ orgCode: userStore.orgCode }).then(res => {
		if (res.success) {
			if (res.result?.id) {
				treeData.value = [{ ...res.result, key: res.result.code, label: res.result.name, isLeaf: false }];
				defaultSelect.value.push(treeData.value[0]?.key);
				emits("selectOrg", { orgCode: treeData.value[0].code, orgName: treeData.value[0].name, ifExist: true });
			} else {
				emits("selectOrg", { orgCode: "", orgName: "", ifExist: false });
			}
		}
	});
};
getOrg();

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
		emits("selectOrg", { orgCode: option[0].code, orgName: option[0].name, ifExist: true });
	}
};
</script>

<style scoped>
::v-deep(.n-tree .n-tree-node) {
	padding: 7px 5px 2px 0;
}
</style>

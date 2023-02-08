<template>
	<n-card size="small" style="width: 200px" title="科室列表:">
		<n-tree
			v-if="reLoad"
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
import { h, ref, nextTick } from "vue";
import { getDeptList } from "@/api/system/depAdmin";

const treeData = ref([]);
const defaultSelect = ref([]);
const orgCode = ref();
const emits = defineEmits(["selectDep"]);
const reLoad = ref(true);

const treeRenderLabel = ({ option }) => {
	return h("span", { style: "display: block; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;" }, option.label);
};

const handleReLoad = () => {
	reLoad.value = false;
	nextTick(() => {
		reLoad.value = true;
	});
};

// 获取科室列表
const getDep = data => {
	handleReLoad();
	if (data.ifExist) {
		orgCode.value = data.orgCode;
		getDeptList({ pcode: "", orgCode: data.orgCode }).then(res => {
			if (res.success) {
				treeData.value = res.result.map(item => {
					return { ...item, key: item.code, label: item.name, isLeaf: false };
				});
				if (res.result.length > 0) {
					defaultSelect.value.push(treeData.value[0]?.key);
					emits("selectDep", { depCode: treeData.value[0].code, depName: treeData.value[0].name, ifExist: true });
				} else {
					emits("selectDep", { depCode: "", depName: "", ifExist: false });
				}
			}
		});
	} else {
		emits("selectDep", { depCode: "", depName: "", ifExist: false });
	}
};

const handleLoad = node => {
	return new Promise(resolve => {
		getDeptList({ pcode: node.code, orgCode: orgCode.value })
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

// 选中科室
// eslint-disable-next-line no-unused-vars
const select = (keys, option) => {
	if (keys.length > 0) {
		emits("selectDep", { depCode: option[0].code, depName: option[0].name, ifExist: true });
	}
};

defineExpose({ getDep });
</script>

<style scoped></style>

<template>
	<n-radio-group v-model:value="modelValue">
		<n-radio :value="item.code" v-for="(item, key) in options" :key="key"> {{ item.name }} </n-radio>
	</n-radio-group>
</template>

<script setup>
import useSystemStore from "@/store/modules/system";

defineOptions({ name: "DictSlect" });

const props = defineProps({
	value: {
		type: [String, Number, null]
	},
	// 上级字典编码
	dictCode: {
		type: String,
		required: true
	}
});
const emits = defineEmits(["update:value"]);
const systemStore = useSystemStore();
const options = computed(() => {
	return systemStore.getDictList(props.dictCode);
});
const modelValue = computed({
	get() {
		return props.value;
	},
	set(val) {
		emits("update:value", val);
	}
});

// 刷新字典下拉选择
const resetDict = () => {
	systemStore.removeDictByPCode(props.dictCode);
};

defineExpose({ resetDict });
</script>

<style scoped></style>

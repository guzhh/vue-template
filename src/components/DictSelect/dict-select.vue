<template>
	<n-select label-field="name" value-field="code" v-model:value="modelValue" filterable clearable :options="options" />
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
</script>

<style scoped></style>

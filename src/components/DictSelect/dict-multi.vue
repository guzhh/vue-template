<template>
	<n-select
		multiple
		clearable
		filterable
		label-field="name"
		value-field="code"
		:options="options"
		max-tag-count="responsive"
		v-model:value="selectDict"
	/>
</template>

<script setup>
import { useSystemStore } from "@/store";

defineOptions({ name: "DictSlect" });

const props = defineProps({
	value: {
		type: [String, null, undefined],
		required: true
	},
	// 上级字典编码
	dictCode: {
		type: String,
		required: true
	}
});
const systemStore = useSystemStore();
const emits = defineEmits(["update:value"]);
const options = computed(() => {
	return systemStore.getDictList(props.dictCode);
});

const selectDict = computed({
	get() {
		if (typeof props.value === "string" && props.value !== "") {
			return props.value.split(",");
		}
		return [];
	},
	set(val) {
		emits("update:value", val.join(","));
	}
});
</script>

<style scoped></style>

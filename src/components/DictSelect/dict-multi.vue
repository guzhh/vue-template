<template>
	<n-select
		multiple
		clearable
		filterable
		:options="options"
		:label-field="labelField"
		:value-field="valueField"
		max-tag-count="responsive"
		v-model:value="selectDict"
		@update:value="handleChange"
	/>
</template>

<script setup>
import useSystemStore from "@/store/modules/system";

defineOptions({ name: "DictMulti" });

const props = defineProps({
	value: {
		type: [String, null]
	},
	// 上级字典编码
	dictCode: {
		type: String,
		required: true
	},
	valueField: {
		type: String,
		default: "code"
	},
	labelField: {
		type: String,
		default: "name"
	}
});
const systemStore = useSystemStore();
const emits = defineEmits(["update:value", "change"]);
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

// 刷新字典下拉选择
const flushedDict = () => {
	systemStore.removeDictByPCode(props.dictCode);
};

const handleChange = () => {
	emits("change", selectDict.value.join(","));
};

defineExpose({ flushedDict });
</script>

<style scoped></style>

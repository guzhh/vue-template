<template>
	<n-select
		label-field="name"
		value-field="code"
		v-model:value="modelValue"
		filterable
		clearable
		:options="options"
		@update:value="handleChange"
	/>
</template>

<script setup>
import useSystemStore from "@/store/modules/system";

defineOptions({ name: "DictSlect" });

const props = defineProps({
	value: {
		type: [String, Number, null]
	},
	name: {
		type: [String, Number, null]
	},
	val: {
		type: [String, Number, null]
	},
	// 上级字典编码
	dictCode: {
		type: String,
		required: true
	}
});
const emits = defineEmits(["update:value", "update:name", "update:val", "change"]);
const systemStore = useSystemStore();
const options = computed(() => {
	return systemStore.getDictList(props.dictCode);
});
const modelValue = computed({
	get() {
		return props.value;
	},
	set(val) {
		const dict = options.value.find(item => item.code === val);
		emits("update:value", dict?.code);
		emits("update:name", dict?.name);
		emits("update:val", dict?.dictVal);
	}
});

const handleChange = () => {
	emits("change", modelValue.value);
};

// 刷新字典下拉选择
const resetDict = () => {
	systemStore.removeDictByPCode(props.dictCode);
};

defineExpose({ resetDict });
</script>

<style scoped></style>

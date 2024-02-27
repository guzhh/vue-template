<template>
	<n-checkbox-group v-model:value="modelValue" @update:value="handleChange">
		<n-space item-style="display: flex;">
			<n-checkbox :value="item.code" :label="item.name" v-for="(item, key) in options" :key="key" />
		</n-space>
	</n-checkbox-group>
</template>

<script setup>
import useSystemStore from "@/store/modules/system";

defineOptions({ name: "DictCheckbox" });

const props = defineProps({
	value: {
		type: [String, null]
	},
	// 上级字典编码
	dictCode: {
		type: String,
		required: true
	}
});
const emits = defineEmits(["update:value", "change", "update:name"]);
const systemStore = useSystemStore();
const options = computed(() => {
	return systemStore.getDictList(props.dictCode);
});
const modelValue = computed({
	get() {
		if (typeof props.value === "string" && props.value !== "") {
			return props.value.split(",");
		}
		return [];
	},
	set(val) {
		emits("update:value", val.join(","));
		emits("update:name", val.map(code => systemStore.getDictNameByValue(props.dictCode, code)).join(","));
	}
});

// 刷新字典下拉选择
const resetDict = () => {
	systemStore.removeDictByPCode(props.dictCode);
};

const handleChange = () => {
	emits("change", modelValue.value.join(","));
};

defineExpose({ resetDict });
</script>

<style scoped></style>

<template>
	<n-radio-group v-model:value="modelValue">
		<n-space :vertical="vertical">
			<n-radio :value="item[valueField]" v-for="(item, key) in options" :key="key"> {{ item[labelField] }} </n-radio>
			<span @click="modelValue = null" style="color: #cfcaca; cursor: pointer">清除</span>
		</n-space>
	</n-radio-group>
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
	},
	vertical: {
		// 是否垂直
		type: Boolean,
		default: false
	}
});
const emits = defineEmits(["update:value", "update:name"]);
const systemStore = useSystemStore();
const options = computed(() => {
	return systemStore.getDictList(props.dictCode);
});
const modelValue = computed({
	get() {
		return props.value;
	},
	set(val) {
		const dict = options.value.find(item => item[props.valueField] === val);
		// console.log("dict=======", dict);
		emits("update:value", val);
		emits("update:name", dict?.name);
	}
});

// 刷新字典下拉选择
const resetDict = () => {
	systemStore.removeDictByPCode(props.dictCode);
};

defineExpose({ resetDict });
</script>

<style scoped></style>

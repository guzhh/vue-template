<template>
	<n-select
		:label-field="labelField"
		:value-field="valueField"
		v-model:value="modelValue"
		filterable
		clearable
		:options="options"
		@update:value="handleChange"
		:render-option="ifTip ? dictRenderOption : undefined"
		:title="dictItem?.name"
	/>
</template>

<script setup>
import { NTooltip } from "naive-ui";
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
	},
	valueField: {
		type: String,
		default: "code"
	},
	labelField: {
		type: String,
		default: "name"
	},
	ifTip: {
		type: Boolean, // Tooltip提示
		default: false // 默认不提示
	}
});
const emits = defineEmits(["update:value", "update:name", "update:val", "change"]);
const systemStore = useSystemStore();
const options = computed(() => {
	return systemStore.getDictList(props.dictCode);
});

const dictItem = ref({}); // 选中的dict，为了增加鼠标移动上去title显示选中的值名称
const modelValue = computed({
	get() {
		return props.value;
	},
	set(val) {
		const dict = options.value.find(item => item[props.valueField] === val);
		dictItem.value = dict;
		emits("update:value", dict?.[props.valueField]);
		emits("update:name", dict?.name);
		emits("update:val", dict?.dictVal);
	}
});

// 字典选项，增加Tooltip
const dictRenderOption = ({ node, option }) =>
	h(
		NTooltip,
		{ placement: "right" },
		{
			trigger: () => node,
			default: () => option.name
		}
	);

const handleChange = () => {
	emits("change", modelValue.value, options.value);
};

// 刷新字典下拉选择
const resetDict = () => {
	systemStore.removeDictByPCode(props.dictCode);
};

defineExpose({ resetDict });
</script>

<style scoped></style>

<template>
	{{ dictName }}
</template>

<script setup>
import useSystemStore from "@/store/modules/system";

const props = defineProps({
	pcode: {
		type: [String],
		required: true
	},
	dictValue: {
		type: [String, null]
	}
});

const systemStore = useSystemStore();

const dictName = computed(() => {
	if (
		typeof props.dictValue === "string" &&
		props.pcode !== "" &&
		props.dictValue !== "" &&
		props.pcode !== undefined &&
		props.pcode !== null
	) {
		const dictList = props.dictValue.split(",");
		const list = dictList.map(value => systemStore.getDictNameByValue(props.pcode, value));
		return list.join(",");
	}
	if (props.pcode === undefined || props.pcode === null) {
		return "";
	}
	return "未知字典";
});
</script>

<style scoped></style>

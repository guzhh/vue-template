<template>
	{{ dictName }}
</template>

<script setup>
import { useSystemStore } from "@/store";

const props = defineProps({
	dictCode: {
		type: [String, null, undefined],
		required: true
	}
});

const systemStore = useSystemStore();

const dictName = computed(() => {
	if (typeof props.dictCode === "string" && props.dictCode !== "") {
		const dictList = props.dictCode.split(",");
		const list = dictList.map(code => systemStore.getDictName(code));
		return list.join(",");
	}
	return "未知字典";
});
</script>

<style scoped></style>

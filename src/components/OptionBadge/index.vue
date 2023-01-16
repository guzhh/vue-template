<template>
	<div style="display: inline-flex; align-items: center">
		<n-badge :type="option.type" :color="option.color" dot></n-badge>
		<span style="margin-left: 5px">{{ option.label }}</span>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	options: {
		type: Array,
		required: true,
		default() {
			return [];
		}
	},
	val: {
		type: [String, Number],
		required: true,
		default: "请输入"
	}
});

const option = computed(() => {
	const obj = props.options.find(item => item.value === props.val);
	if (obj) return obj;
	return { label: "未知", color: "grey" };
});

// const option =
</script>

<style scoped></style>

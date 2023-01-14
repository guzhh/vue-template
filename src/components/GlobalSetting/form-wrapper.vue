<template>
	<n-input-number
		v-if="type === 'number'"
		:style="{ width: '80px' }"
		size="small"
		:default-value="defaultValue"
		@update:value="handleChange"
	/>
	<n-switch v-else :default-value="defaultValue" size="small" @update:value="handleChange" />
</template>

<script setup>
const props = defineProps({
	type: {
		type: String,
		default: ""
	},
	name: {
		type: String,
		default: ""
	},
	defaultValue: {
		type: [String, Boolean, Number],
		default: ""
	}
});
const emit = defineEmits(["inputChange"]);
const handleChange = value => {
	emit("inputChange", {
		value,
		key: props.name
	});
};
</script>

<template>
	<base-modal style="width: 700px" title="生成JSON" :footer="false" v-model:show="visible" @close="handleClose">
		<CodeEditor style="height: 100%" :value="generateJsonTemplate" language="json" readonly />
	</base-modal>
</template>

<script setup>
const visible = ref(false);

const generateJsonTemplate = ref(JSON.stringify({}, null, 2));

const handleClose = () => {
	visible.value = false;
};

const open = val => {
	generateJsonTemplate.value = val;
	visible.value = true;
};

defineExpose({ open });
</script>

<style scoped></style>

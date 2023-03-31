<template>
	<base-modal
		style="width: 700px"
		title="生成JSON"
		subBtuText="验证表单"
		v-model:show="visible"
		@close="handleClose"
		@ok="handleOk"
	>
	</base-modal>
</template>

<script setup>
import { naiveui } from "../config";

const visible = ref(false);
const widgetForm = ref(JSON.parse(JSON.stringify(naiveui.widgetForm)));

const handleClose = () => {
	visible.value = false;
};

const handleOk = () => {};

const open = val => {
	widgetForm.value = val;
	visible.value = true;
};

defineExpose({ open });
</script>

<style scoped></style>

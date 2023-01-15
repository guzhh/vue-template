<template>
	<lay-layer v-model="visible" :type="1" title="资源操作"> content</lay-layer>
</template>

<script setup>
import { ref } from "vue";

defineOptions({ name: "resource-form" });
const visible = ref(false);

const openModal = () => {
	visible.value = true;
};

defineExpose({ openModal });
</script>

<style scoped></style>

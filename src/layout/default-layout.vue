<template>
	<default-view>
		<page-view></page-view>
	</default-view>
</template>

<script setup>
import DefaultView from "./default-view.vue";
import PageView from "./page-view.vue";

defineOptions({ name: "DefaultLayout" });
</script>

<style scoped></style>

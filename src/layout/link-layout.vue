<template>
	<default-view>
		<page-content>
			<link-view></link-view>
		</page-content>
	</default-view>
</template>

<script setup>
import DefaultView from "./default-view.vue";
import LinkView from "@/layout/link-view.vue";

defineOptions({ name: "linkLayout" });
</script>

<style scoped></style>

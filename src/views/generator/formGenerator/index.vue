<template>
	<page-content>
		<div style="width: 100%" :style="{ height: `${height - 15}px` }">
			<form-design />
		</div>
	</page-content>
</template>

<script setup>
import { FormDesign } from "@guzhh/custom-form";
import { useWindowSize } from "@/hooks/useWindowSize";

const { height } = useWindowSize();
</script>

<style scoped></style>
